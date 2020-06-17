import { Controller, Post, Get, Body, Res, HttpStatus, Param, Logger} from '@nestjs/common';
import { Response } from "express";
import { PresentationsService } from "./presentations.service";
import { MsgPresentationReady } from '../interfaces/dtos'

@Controller('presentation')
export class PresentationsController {
  private readonly logger = new Logger(PresentationsController.name);
   constructor(private readonly presentationsService: PresentationsService) {}

  @Post("validation")
  async receivePresentation(
    @Body() body: MsgPresentationReady,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.presentationsService.validatePresentation(
      body
    );

    return res.status(HttpStatus.CREATED).send(result);
  }


}
