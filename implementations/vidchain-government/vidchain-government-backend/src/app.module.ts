import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PresentationsController } from './presentations/presentations.controller';
import { PresentationsService } from './presentations/presentations.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PresentationsController],
  providers: [AppService, UsersService, PresentationsService],
})
export class AppModule {}
