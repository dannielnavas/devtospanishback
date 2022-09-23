import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { DevtoService } from './devto.service';
import { IResponseDevTo } from './models/devto-response.model';

@Controller('api')
export class DevtoController {
  statistic: any;

  constructor(private statisticService: DevtoService) {}

  @Get('postspanish/:page')
  async getDataStatistics(@Res() res, @Param('page') page: string) {
    console.log('llegada');
    try {
      const devtoEspanhol: IResponseDevTo[] =
        await this.statisticService.getDataDevToEspanhol(page);
      devtoEspanhol.push(
        ...(await this.statisticService.getDataDevToEspanol(page)),
      );
      devtoEspanhol.push(
        ...(await this.statisticService.getDataDevToSpanish(page)),
      );
      devtoEspanhol.sort((a, b) => b.id - a.id);
      return res.status(HttpStatus.OK).json(devtoEspanhol);
    } catch (error) {
      console.log(error);
    }
  }
}
