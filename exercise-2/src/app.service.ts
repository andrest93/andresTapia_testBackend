import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryResponseInterface, VerificationStateReponseInterface } from './commons/interfaces';
import { Tribe } from './entities/tribe.entity';
import { repositoryStates, RepositoryStates, verifyStates } from './commons/commons';
import { VerificationStateService } from './services/verificationState.service';
import { json2csvAsync } from 'json-2-csv';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Tribe)
    private tribeRepository: Repository<Tribe>,
    private verificationStateService: VerificationStateService
  ) {}

  async getRepositories(idTribe: number): Promise<RepositoryResponseInterface> {
    
    const tribe = await this.tribeRepository
      .createQueryBuilder('tribe')
      .leftJoinAndSelect("tribe.organization", "organization")
      .leftJoinAndSelect("tribe.repositories", "repository")
      .leftJoinAndSelect("repository.metrics", "metrics")
      .where('tribe.id = :idTribe', { idTribe })
      .getOne();

    if (tribe === null) {
        throw new NotFoundException('La Tribu no se encuentra registrada');
    }

    const minCoverage = 75;
    const currentYear = new Date().getFullYear();

    if (tribe.repositories.filter(repository => repository.metrics.coverage > minCoverage).length === 0) {
      throw new NotFoundException('La Tribu no tiene repositorios que cumplan con la cobertura necesaria');
    }

    const repositories = tribe.repositories.filter(
      repository => repository.metrics.coverage > minCoverage &&  
      repository.create_time.getFullYear() === currentYear &&
      repository.state === RepositoryStates.Enabled )

    const verificationStates = await this.verificationStateService.getStates();

    return {
      repositories: repositories.map(repository => {
        return {
          id: repository.id,
          name: repository.name,
          tribe: tribe.name,
          organization: tribe.organization.name,
          coverage: `${repository.metrics.coverage}%`,
          codeSmells: repository.metrics.code_smells,
          bugs: repository.metrics.bugs,
          vulnerabilities: repository.metrics.vulnerabilities,
          hotstop: repository.metrics.hotspot,
          verificationState: this.getVerificationState(repository.id, verificationStates.data),
          state: repositoryStates[repository.state],
        }
      }),
    };
  }

  async convertToCSV(dataRepositories: RepositoryResponseInterface){
    const csv = await json2csvAsync(dataRepositories.repositories);
    const fs = require('fs');
    fs.writeFileSync("repositories.csv", csv)
    const file = createReadStream(join(process.cwd(), 'repositories.csv'));
    return file;
  }

  getVerificationState(repositoryId: number, verificationStates: VerificationStateReponseInterface){
    const repositoryState =  verificationStates.repositories.find(repository => repository.id === +repositoryId);
    return verifyStates[repositoryState.state];
  }

}

