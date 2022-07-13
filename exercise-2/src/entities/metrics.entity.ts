import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { Repository } from './repository.entity';

@Entity({ name: 'metrics', schema: 'public' })
export class Metrics {
  
  //@PrimaryColumn()
  //id_repository: number;

  @PrimaryColumn({ primary: false })
  id_repository: number;

  @OneToOne(() => Repository, repository => repository.metrics) //ok
  @JoinColumn({ name: 'id_repository' })
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
