import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(`Conecting to ${this.config.get('DATABASE_HOST')}}`);
    return {
      type: 'postgres',
      host: this.config.get('DATABASE_HOST'),
      port: parseInt(this.config.get('DATABASE_PORT')),
      username: this.config.get('DATABASE_USER'),
      password: this.config.get('DATABASE_PASSWORD'),
      database: this.config.get('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrationsTableName: 'migrations',
      migrations: ['src/migration/*.ts'],
      ssl: true,
      synchronize: false,
      extra: {
        options: this.config.get('DATABASE_OPTIONS'),
      },
    };
  }
}
