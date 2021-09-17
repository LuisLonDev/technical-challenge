import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pairs } from '../enums/pairs.enum';
import { LectureEntity } from './lectures.entity';

@Entity('pair')
export class PairEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    type: 'enum',
    enum: Pairs,
    unique: true,
  })
  symbol: Pairs;

  @OneToMany(() => LectureEntity, (lecture) => lecture.pair)
  lectures?: LectureEntity[];
}
