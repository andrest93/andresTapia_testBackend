import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './organization.entity';
import { Repository } from './repository.entity';

@Entity({ name: 'tribe', schema: 'public' })
export class Tribe {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Organization, organization => organization.tribes)
  organization: Organization;

  @OneToMany(() => Repository, repository => repository.tribe)
  repositories: Repository[];

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  status: number;
}
