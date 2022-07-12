import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({ name: 'organization', schema: 'public' })
export class Organization {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  status: number;
}
