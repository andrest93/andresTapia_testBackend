import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from '../entities/organization.entity';
import { Repository } from 'typeorm';

export interface OrganizationInterface {
  id?: number;
  name: string;
  status: number;
}

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private repository: Repository<OrganizationInterface>,
  ) {}

  create(organization: OrganizationInterface) {
    return this.repository.save(this.repository.create(organization));
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  update(id: number, organization: OrganizationInterface) {
    return this.repository
      .createQueryBuilder()
      .update()
      .set({
        name: organization.name,
        status: organization.status,
      })
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Organization)
      .where('id = :id', { id })
      .execute();
  }
}
