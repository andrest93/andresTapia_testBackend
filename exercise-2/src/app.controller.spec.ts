import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerificationStateReponseInterface } from './commons/interfaces';
import { VerificationStateService } from './services/verificationState.service';

jest.mock('axios');

describe('AppController', () => {
  let appController: AppController;
  let httpService: HttpService;
  let verificationStateService: VerificationStateService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, VerificationStateService, HttpService],
    }).compile();

    verificationStateService = app.get<VerificationStateService>(VerificationStateService);
    httpService = app.get<HttpService>(HttpService);
    appController = app.get<AppController>(AppController);
  });

  describe('Get repositories test', () => {
    it('should return the repositories data', () => {
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      const verificationResponse: VerificationStateReponseInterface = {
        repositories: [
          {
              id: 1,
              state: 604
          },
          {
              id: 2,
              state: 605
          },
          {
              id: 3,
              state: 606
          }
        ]
      };

      expect(appController.getRepositories('1'))
      .toBe('Hello World!');
    });
  });
});
