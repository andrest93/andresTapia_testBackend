import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  constructor(private configService: ConfigService) {}

  public getConfig(name: string): string {
    return this.configService.get(name);
  }
}
