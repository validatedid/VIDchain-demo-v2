import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Logger,
  } from "@nestjs/common";
  import { Response } from "express";
  import { AuthService } from "./auth.service";
  import * as config from "../config";
  
  @Controller("demo/gaviusbackend/auth")
  export class AuthController {
    private readonly logger = new Logger(AuthController.name);
  
    constructor(private readonly authService: AuthService) {}

  
    @Post("")
    async requestUserInfo(
      @Body() body: any,
      @Res() res: Response
    ): Promise<Response<any>> {
      const result = await this.authService.handleUserInfo(config.IDENTITY_PROVIDER+"/o/oauth2/token",body);
      return res.status(HttpStatus.CREATED).send(result);
    }
  }
  