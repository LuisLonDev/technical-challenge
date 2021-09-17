import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PairDTO } from '../dtos/pair.dto';
import { PairEntity } from '../entities/pair.entity';

@Injectable()
export class PairsService {
  constructor(
    @InjectRepository(PairEntity)
    private readonly pairRepository: Repository<PairEntity>,
  ) {}

  public async createNewPair(pair: PairDTO) {
    try {
      return await this.pairRepository.save(pair);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getPairs() {
    return await this.pairRepository.find();
  }
}
