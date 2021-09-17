import { PairEntity } from '../entities/pair.entity';

export interface LectureDTO {
  pair: PairEntity;
  price: number;
}
