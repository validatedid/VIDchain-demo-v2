import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PresentationsController } from './presentations/presentations.controller';
import { PresentationsService } from './presentations/presentations.service';

@Module({
  imports: [],
  controllers: [UsersController, PresentationsController],
  providers: [UsersService, PresentationsService],
})
export class AppModule {}
