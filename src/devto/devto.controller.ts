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
    const devtoEspanhol: IResponseDevTo[] =
      await this.statisticService.getDataDevToEspanhol();
    const devtoEspanol: IResponseDevTo[] =
      await this.statisticService.getDataDevToEspanol();
    const devtoSpanish: IResponseDevTo[] =
      await this.statisticService.getDataDevToSpanish();
    const devto: IResponseDevTo[] = devtoEspanhol
      .concat(devtoSpanish)
      .concat(devtoEspanol);

    devto.sort((a, b) => b.id - a.id);

    return res.status(HttpStatus.OK).json(devto);
  }
}
