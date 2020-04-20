import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import {Signature, ValidateResponse, User} from "./interfaces/dtos";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('validate')
  async validate(@Body() signature: Signature): Promise<ValidateResponse> {
    
    if (!signature) {
      throw new BadRequestException("Invalid Params")
    }
    return this.appService.validate(signature);
  }

}
