import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return repositories data', () => {
      const expectedData = {
        repositories: [
          {
            id: 1,
            state: 604,
          },
          {
            id: 2,
            state: 605,
          },
          {
            id: 3,
            state: 606,
          },
        ],
      };
      expect(appController.getRepositories()).toBe(expectedData);
    });
  });
});
