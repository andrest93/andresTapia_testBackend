import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { Repository } from './repository.entity';

@Entity({ name: 'tribe', schema: 'public' })
export class Tribe {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Organization, organization => organization.tribes)//ok
  @JoinColumn({ name: 'id_organization' })
  organization: Organization;

  @OneToMany(() => Repository, repository => repository.tribe)//ok
  repositories: Repository[];

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  status: number;
}
