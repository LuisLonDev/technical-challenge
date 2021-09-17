import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LectureDTO } from '../dtos/lecture.dto';
import { LectureEntity } from '../entities/lectures.entity';
import { PairEntity } from '../entities/pair.entity';
import { Pairs } from '../enums/pairs.enum';

@Injectable()
export class LectureService {
  logger = new Logger('LectureService');
  constructor(
    @InjectRepository(LectureEntity)
    private readonly lectureRepository: Repository<LectureEntity>,
    @InjectRepository(PairEntity)
    private readonly pairRepository: Repository<PairEntity>,
    private httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  private async _getNewLectures() {
    this.logger.log('getting the latest prices for existing pairs');
    const pairs = await this.pairRepository.find();

    if (pairs.length > 0) {
      Promise.allSettled(
        pairs.map(async (pair) => {
          let price = await this.httpService
            .get(
              `https://api.binance.com/api/v3/avgPrice?symbol=${pair.symbol}`,
            )
            .toPromise();
          return {
            pair,
            price: price.data.price,
          } as LectureDTO;
        }),
      ).then((results) => {
        this.logger.log('all the latest prices were succesffully getted');
        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            let lecture: LectureDTO = result.value;
            this.lectureRepository.save(lecture);
          }
        });
      });
    } else {
      this.logger.log('there are no pairs');
    }
  }

  async getAverageLastNLectures(symbol: Pairs, numberOfLectures: number) {
    if (!Object.values(Pairs).includes(symbol))
      throw new Error('symbol does not exist in our database');

    let lectures = await this.lectureRepository.find({
      where: { pair: { symbol } },
      relations: ['pair'],
      order: { lastJob: 'DESC' },
      take: numberOfLectures,
    });

    let prices = lectures.map((lecture) => lecture.price);

    if (numberOfLectures > prices.length) numberOfLectures = prices.length;

    const average =
      prices.reduce((partial_sum, a) => partial_sum + a, 0) / numberOfLectures;

    return {
      average,
      numberOfLectures,
    };
  }
}
