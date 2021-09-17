import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import { Pairs } from '../enums/pairs.enum';
import { LectureService } from '../services/lectures.service';

@Controller('average')
export class LectureController {
  logger = new Logger('LectureController');

  constructor(private readonly lectureService: LectureService) {}

  @Get('/')
  async getAverageFromLastNLectures(
    @Query('symbol') symbol: Pairs,
    @Query('lectures') lectures: number,
  ) {
    this.logger.log(
      `avergae endpoint called with params: symbol: ${symbol}, lectures: ${lectures} `,
    );
    try {
      return await this.lectureService.getAverageLastNLectures(
        symbol,
        lectures,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
