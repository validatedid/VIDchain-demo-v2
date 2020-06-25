import { Module } from '@nestjs/common';
import {PresentationsController} from './presentations/presentations.controller'
import {PresentationsService} from './presentations/presentations.service'
import {EventsModule} from './events/events.module'

@Module({
  imports: [EventsModule],
  controllers: [PresentationsController],
  providers: [PresentationsService],
})
export class AppModule {}
