import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map, Observable } from "rxjs";
import { VerificationStateReponseInterface } from "src/commons/interfaces";

@Injectable()
export class VerificationStateService {
  constructor(private readonly httpService: HttpService) {}

  getStates(): Promise<AxiosResponse<VerificationStateReponseInterface>> {
    return this.httpService.axiosRef.get('http://localhost:3000/exercise-1/repositories')
  }
}