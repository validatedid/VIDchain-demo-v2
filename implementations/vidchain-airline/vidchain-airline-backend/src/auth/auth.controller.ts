import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Logger,
    Get,
    Param,
    Query,
    BadRequestException
  } from "@nestjs/common";
  import { Response } from "express";
  import { AuthService } from "./auth.service";
  import * as config from "../config";
  import * as didAuth from '../interfaces/didAuth';
  import * as io from "socket.io-client";

  @Controller("demo/airlinebackend/auth")
  export class AuthController {
    private readonly logger = new Logger(AuthController.name);
  
    private readonly socket = io(config.WS_URL, {
        path: "/airlinews",
        transports: ["websocket"],
      });

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
    async didAuthRequest(@Param() params, @Query("socket_id") socketId: string, @Res() res: Response): Promise<Response<any>> {
        try{
            const result = await this.authService.didAuthRequest(socketId);
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
        const result: didAuth.BackendResponseSiop = await this.authService.validateResponse(body);
        //Send info to frontend
        this.socket.to(result.socketId).emit("didAuthDidKey", result.validationResponse);
        //If redirectUrl sends to the app for redirection
        if(result.redirectUrl){
            return res.status(HttpStatus.CREATED).send(result.redirectUrl);
        } 
        return res.status(HttpStatus.CREATED).send();
    }

  }
  