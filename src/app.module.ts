import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureEntity } from './pairs/entities/lectures.entity';
import { PairEntity } from './pairs/entities/pair.entity';
import { PairsModule } from './pairs/pairs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: '172.17.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'pairs',
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: [PairEntity, LectureEntity],
    }),
    ScheduleModule.forRoot(),
    PairsModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
