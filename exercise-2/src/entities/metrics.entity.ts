import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Repository } from './repository.entity';

@Entity({ name: 'metrics', schema: 'public' })
export class Metrics {
  @PrimaryColumn()
  id_repository: number;

  @ManyToOne(() => Repository, repository => repository.metrics)
  repository: Repository;

  @Column()
  coverage: number;

  @Column()
  bugs: number;

  @Column()
  vulnerabilities: number;

  @Column()
  hotspot: number;

  @Column()
  code_smells: number;
}
