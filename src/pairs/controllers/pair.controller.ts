import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { PairDTO } from '../dtos/pair.dto';
import { PairsService } from '../services/pairs.service';

@Controller('pairs')
export class PairsController {
  logger = new Logger('PairsController');

  constructor(private readonly pairsService: PairsService) {}

  @Get('/')
  async getPairs() {
    this.logger.log(`pairs get endpoint called `);
    return { results: [...(await this.pairsService.getPairs())] };
  }

  @Post('/')
  async postPairs(@Body() newPair: PairDTO) {
    this.logger.log(
      `pairs post endpoint called with payload: ${newPair.symbol}`,
    );
    try {
      return await this.pairsService.createNewPair(newPair);
    } catch (err) {
      this.logger.error(err.message);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
