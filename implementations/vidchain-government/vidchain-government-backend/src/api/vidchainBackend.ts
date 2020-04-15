import { Injectable } from '@nestjs/common';
import {ValidateResponse, Signature} from "../interfaces/dtos"

@Injectable()
export class vidchainBackend {

  
  static validateJWTInBackend(signature:Signature): string {
    return "";
  }

  establishConnection(){

  }
}