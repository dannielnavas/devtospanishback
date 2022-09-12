import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { DevtoService } from './devto.service';
import { IResponseDevTo } from './models/devto-response.model';

@Controller('api')
export class DevtoController {
  statistic: any;

  constructor(private statisticService: DevtoService) {}

  @Get('postspanish')
  async getDataStatistics(@Res() res) {
    console.log('llegada');
    try {
      const devtoEspanhol: IResponseDevTo[] =
        await this.statisticService.getDataDevToEspanhol();
      devtoEspanhol.push(
        ...(await this.statisticService.getDataDevToEspanol()),
      );
      devtoEspanhol.push(
        ...(await this.statisticService.getDataDevToSpanish()),
      );
      devtoEspanhol.sort((a, b) => b.id - a.id);
      return res.status(HttpStatus.OK).json(devtoEspanhol);
    } catch (error) {
      console.log(error);
    }
  }
}
