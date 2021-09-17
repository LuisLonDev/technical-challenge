import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PairEntity } from './pair.entity';

@Entity('lecture')
export class LectureEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public lastJob: Date;

  @ManyToOne(() => PairEntity, (pair) => pair.lectures, { cascade: true })
  pair: PairEntity;
}
