import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './controllers/lecture.controller';
import { PairsController } from './controllers/pair.controller';
import { LectureEntity } from './entities/lectures.entity';
import { PairEntity } from './entities/pair.entity';
import { LectureService } from './services/lectures.service';
import { PairsService } from './services/pairs.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([PairEntity, LectureEntity])],
  controllers: [PairsController, LectureController],
  providers: [PairsService, LectureService],
})
export class PairsModule {}
