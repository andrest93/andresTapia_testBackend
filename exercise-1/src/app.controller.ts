import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/repositories')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRepositories(): string {
    return this.appService.getRepositories();
  }
}
