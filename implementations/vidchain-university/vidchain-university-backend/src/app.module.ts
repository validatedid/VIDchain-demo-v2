import { Module } from '@nestjs/common';
import {PresentationsController} from './presentations/presentations.controller'
import {PresentationsService} from './presentations/presentations.service'

@Module({
  controllers: [PresentationsController],
  providers: [PresentationsService],
})
export class AppModule {}
