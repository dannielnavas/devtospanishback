import { Module } from '@nestjs/common';
import { DevtoController } from './devto.controller';
import { DevtoService } from './devto.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DevtoController],
  providers: [DevtoService],
})
export class DevtoModule {}
