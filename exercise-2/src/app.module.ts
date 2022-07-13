import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/database';
import { OrganizationsModule } from './modules/organizations.module';
import { Tribe } from './entities/tribe.entity';
import { Repository } from './entities/repository.entity';
import { Metrics } from './entities/metrics.entity';
import { VerificationStateService } from './services/verificationState.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([Tribe,Repository,Metrics]),
    OrganizationsModule,
  ],
  controllers: [AppController],
  providers: [VerificationStateService, AppService],
})
export class AppModule {}
