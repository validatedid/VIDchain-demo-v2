import { Controller, Post, Get, Body, Res, HttpStatus, Param, Logger} from '@nestjs/common';
import { Response } from "express";
import { PresentationsService } from "./presentations.service";
import { MsgPresentationReady } from '../interfaces/dtos';
import * as io from 'socket.io-client';

@Controller('demo/governmentbackend/presentation')
export class PresentationsController {
  private readonly logger = new Logger(PresentationsController.name);
  //private readonly socket = io('https://fd4b7eb1114c.ngrok.io', {
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
    //To do - Multiple services emits 
    //Extract from result, example:
    /* 
    {"@context":["https://www.w3.org/2018/credentials/v1"],"id":"https://example.com/credential/2390","type":["VerifiableCredential","ServiceCredential"],"issuer":"did:vid:0xfB5390914b110BEB6c0B250CB59b23E156B68e29","issuanceDate":"2020-07-07T11:57:04.000Z","credentialSubject":{"id":"did:vid:0xbF24AFaee5AFF10Dd661D971f6Bc762b5E4e6CA9","name":"Library","startAt":1594123024,"expiresAt":1625227024},"proof":{"type":"EcdsaSecp256k1Signature2019","created":"2020-07-07T11:57:04.000Z","proofPurpose":"assertionMethod","verificationMethod":"did:vid:0xfB5390914b110BEB6c0B250CB59b23E156B68e29#key-1","jws":"eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDp2aWQ6MHhmQjUzOTA5MTRiMTEwQkVCNmMwQjI1MENCNTliMjNFMTU2QjY4ZTI5I2tleS0xIn0.eyJpYXQiOjE1OTQxMjMwMjQsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJTZXJ2aWNlQ3JlZGVudGlhbCJdLCJpc3N1ZXIiOiJkaWQ6dmlkOjB4ZkI1MzkwOTE0YjExMEJFQjZjMEIyNTBDQjU5YjIzRTE1NkI2OGUyOSIsImlkIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9jcmVkZW50aWFsLzIzOTAiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDp2aWQ6MHhiRjI0QUZhZWU1QUZGMTBEZDY2MUQ5NzFmNkJjNzYyYjVFNGU2Q0E5IiwibmFtZSI6IkxpYnJhcnkiLCJzdGFydEF0IjoxNTk0MTIzMDI0LCJleHBpcmVzQXQiOjE2MjUyMjcwMjR9fSwiaXNzIjoiZGlkOnZpZDoweGZCNTM5MDkxNGIxMTBCRUI2YzBCMjUwQ0I1OWIyM0UxNTZCNjhlMjkifQ.nSFBdoEWVf_8AUmU5gFFZCO5nTINywnjrjC1eN0AEOmBn1rtjvJheKpxl1Je93GR9e6jLSstlz9_69HoSTuvRAE"}}
    */
    this.socket.emit('presentationReady', result);
    return res.status(HttpStatus.CREATED).send(result);
  }

  @Post("request")
  async requestPresentation(
    @Body() body: MsgPresentationReady,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const result = await this.presentationsService.handleRequest(
      body
    );
    return res.status(HttpStatus.CREATED).send(result);
  }


}
