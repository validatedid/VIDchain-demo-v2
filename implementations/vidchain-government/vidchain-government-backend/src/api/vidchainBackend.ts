import { Injectable } from '@nestjs/common';
import {ValidateResponse, Signature} from "../interfaces/dtos"
import * as config from '../config';
import axios from 'axios';
import { Logger } from '@nestjs/common';

export class VidchainBackend {
  private logger: Logger = new Logger('VidchainBackend');
  constructor() {

  }

  async validateJWTInBackend(signature:Signature): Promise<string> {
    var bearerToken = await this.establishConnection();
    this.logger.log(bearerToken);
    let authorization = {
        headers: {
          Authorization: "Bearer " + bearerToken
        }
      };
    var response = await this.validateJWTInVidChain(authorization,signature);
    return response;
  }

  private async establishConnection(): Promise<string>{
    let data = {
        enterpriseName: config.Name,
        nonce: config.nonce
    };
    const response = await axios.post(config.API_URL + "token", data);
    return response.data.jwt;
  }
  private async validateJWTInVidChain(authorization,signature){
      const response = await axios.post(config.API_URL + "signature/validation", signature, authorization);
      this.logger.log(response.data);
      return response.data;
  }
}
