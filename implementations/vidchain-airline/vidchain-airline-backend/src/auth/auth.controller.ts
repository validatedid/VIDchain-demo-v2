import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Logger,
    Get,
    Param
  } from "@nestjs/common";
  import { Response } from "express";
  import { AuthService } from "./auth.service";
  import * as config from "../config";
  
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
      @Body() body: any,
      @Res() res: Response
    ): Promise<Response<any>> {
        try{
            // const result = await this.authService.getToken(config.IDENTITY_PROVIDER+"/oauth2/token",body);
            const result = "ok";
            console.log(JSON.stringify(body));
            return res.status(HttpStatus.CREATED).send(result);
        }
        catch(error){
            res.status(500);
            res.json(error);
        }
    }

    @Get("jwt")
    async getJwt(@Param() params, @Res() res: Response): Promise<Response<any>> {
        try{
            // const result = await this.authService.getToken(config.IDENTITY_PROVIDER+"/oauth2/token",body);
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
  