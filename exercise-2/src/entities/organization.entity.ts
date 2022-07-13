import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Tribe } from './tribe.entity';

@Entity({ name: 'organization', schema: 'public' })
export class Organization {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  status: number;

  @OneToMany(() => Tribe, tribe => tribe.organization) //ok
    tribes: Tribe[];
}
