import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevtoModule } from './devto/devto.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DevtoModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
