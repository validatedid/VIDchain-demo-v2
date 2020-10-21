import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response, response } from "express";
import { PresentationsService } from "./presentations.service";
import { MsgPresentationReady } from "../interfaces/dtos";
import * as io from "socket.io-client";
import * as config from "../config";

@Controller("demo/gaviusbackend/presentation")
export class PresentationsController {
  private readonly logger = new Logger(PresentationsController.name);
  private readonly socket = io(config.WS_URL, {
    path: "/gaviusws",
    transports: ["websocket"],
  });

  constructor(private readonly presentationsService: PresentationsService) {}

  @Post("request")
  async requestPresentation(
    @Body() body: MsgPresentationReady,
    @Res() res: Response
  ): Promise<Response<any>> {
    this.logger.debug("request");
    this.logger.debug(JSON.stringify(body));
    const result = await this.presentationsService.handleRequest(body);
    return res.status(HttpStatus.CREATED).send(result);
  }

  @Post("validation")
  async receivePresentation(
    @Body() body: MsgPresentationReady,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.presentationsService.handlePresentation(body);
    this.logger.debug("presentation ready: "+result);
    this.socket.emit("presentationReady", result);
    return res.status(HttpStatus.CREATED).send(result);
  }

  @Post("token")
  async requestToken(
    @Body() body: any,
    @Res() res: Response
  ): Promise<Response<any>> {
    this.logger.debug("token");
    this.logger.debug(JSON.stringify(body));
    const result = await this.presentationsService.handleToken("https://identitats-pre.aoc.cat/o/oauth2/token",body);
    this.logger.debug("returned");
    return res.status(HttpStatus.CREATED).send(JSON.stringify(result));
  }
}
