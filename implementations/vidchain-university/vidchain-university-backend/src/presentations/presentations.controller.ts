import { Controller, Post, Body, Res, HttpStatus, Logger} from '@nestjs/common';
import { Response } from "express";
import { PresentationsService } from "./presentations.service";
import { MsgPresentationReady } from '../interfaces/dtos';
import * as io from 'socket.io-client';

@Controller('demo/universitybackend/presentation')
export class PresentationsController {
  private readonly logger = new Logger(PresentationsController.name);
  // private readonly socket = io('https://62b399d34a66.ngrok.io', {
  private readonly socket = io('https://dev.api.vidchain.net', {
    path: '/universityws',
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

  @Post("request")
  async requestPresentation(
    @Body() body: MsgPresentationReady,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.presentationsService.handleRequest(body);
    return res.status(HttpStatus.CREATED).send(result);
  }
}
