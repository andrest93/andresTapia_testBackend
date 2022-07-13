import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Metrics } from './metrics.entity';
import { Tribe } from './tribe.entity';

@Entity({ name: 'repository', schema: 'public' })
export class Repository {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Tribe, tribe => tribe.repositories)//ok
  @JoinColumn({ name: 'id_tribe' })
  tribe: Tribe;

  @OneToOne(() => Metrics, metric => metric.repository)
  metrics: Metrics;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  state: string;

  @Column({ type: 'timestamp' })
  create_time: Date;

  @Column()
  status: string;
}
