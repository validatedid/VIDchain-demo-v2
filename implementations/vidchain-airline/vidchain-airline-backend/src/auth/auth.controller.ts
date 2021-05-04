import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Logger,
    Get,
    Param,
    BadRequestException
  } from "@nestjs/common";
  import { Response } from "express";
  import { AuthService } from "./auth.service";
  import * as config from "../config";
  import * as didAuth from '../interfaces/didAuth';

  @Controller("demo/airlinebackend/auth")
  export class AuthController {
    private readonly logger = new Logger(AuthController.name);
  
    constructor(private readonly authService: AuthService) {}

  
    @Post("")
    async requestToken(
      @Body() body: any,
      @Res() res: Response
    ): Promise<Response<any>> {
        try{
            const result = await this.authService.getToken(config.IDENTITY_PROVIDER+"/oauth2/token",body);
            return res.status(HttpStatus.CREATED).send(result);
        }
        catch(error){
            res.status(500);
            res.json(error);
        }
    }

    @Get("didAuthRequest")
    async didAuthRequest(@Param() params, @Res() res: Response): Promise<Response<any>> {
        try{
            const result = await this.authService.didAuthRequest();
            return res.status(HttpStatus.CREATED).send(result);
        }
        catch(error){
            res.status(500);
            res.json(error);
        }
    }

    @Post("didAuthResponse")
    async getResponse(
      @Body() body: didAuth.SiopResponseJwt,
      @Res() res: Response
    ): Promise<Response<any>> {
        if (
            !body ||
            !body.id_token ||
            !body.state
        ) {
            throw new BadRequestException("Wrong parameters provided.");
        }
        const result = await this.authService.validateResponse(body);
        return res.status(HttpStatus.CREATED).send(result);
    }

    @Get("jwt")
    async getJwt(@Param() params, @Res() res: Response): Promise<Response<any>> {
        try{
            const result = "ok";
            console.log(JSON.stringify(params));
            return res.status(HttpStatus.CREATED).send(result);
        }
        catch(error){
            res.status(500);
            res.json(error);
        }
    }
  }
  