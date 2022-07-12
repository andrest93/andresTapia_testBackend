import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  constructor(private configService: ConfigService) {}

  //@Inject(ConfigService)
  //public configService: ConfigService = new ConfigService();

  public getConfig(name: string): string {
    return this.configService.get(name);
  }
}
