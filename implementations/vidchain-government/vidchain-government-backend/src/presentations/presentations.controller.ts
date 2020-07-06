import { Controller, Post, Get, Body, Res, HttpStatus, Param, Logger} from '@nestjs/common';
import { Response } from "express";
import { PresentationsService } from "./presentations.service";
import { MsgPresentationReady } from '../interfaces/dtos';
import * as io from 'socket.io-client';

@Controller('backenddemo/presentation')
export class PresentationsController {
  private readonly logger = new Logger(PresentationsController.name);
  private readonly socket = io('https://dev.api.vidchain.net', {
    path: '/governmentws',
    transports: ['websocket']
  });
  
  constructor(private readonly presentationsService: PresentationsService) {}

  @Post("validation")
  async receivePresentation(
    @Body() body: MsgPresentationReady,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.presentationsService.handlePresentation(
      body
    );
    this.socket.emit('presentationReady', result);
    return res.status(HttpStatus.CREATED).send(result);
  }


}
