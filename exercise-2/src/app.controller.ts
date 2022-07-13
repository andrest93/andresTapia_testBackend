import { Controller, Get, Param, Response, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoryResponseInterface } from './commons/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('repositories/:idTribe')
  getRepositories(@Param('idTribe') idTribe: string): Promise<RepositoryResponseInterface> {
    return this.appService.getRepositories(+idTribe);
  }

  @Get('repositories/:idTribe/csv')
  async getRepositoriesReport(@Param('idTribe') idTribe: string, @Response({ passthrough: true }) res): Promise<StreamableFile>  {
    const repositoryData = await this.appService.getRepositories(+idTribe);
    console.log(repositoryData);
    const csvData = await this.appService.convertToCSV(repositoryData);

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="repositories.csv'
    })

    return new StreamableFile(csvData)

  }
}
