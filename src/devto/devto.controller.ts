import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { DevtoService } from './devto.service';
import { IResponseDevTo } from './models/devto-response.model';

@Controller('api')
export class DevtoController {
  constructor(private devtoService: DevtoService) {}

  @Get('postspanish/:page')
  async getDataDevto(@Res() res, @Param('page') page: string) {
    console.log('llegada');
    try {
      const devtoEspanhol: IResponseDevTo[] =
        await this.devtoService.getDataDevToEspanhol(page);
      devtoEspanhol.push(
        ...(await this.devtoService.getDataDevToEspanol(page)),
      );
      devtoEspanhol.push(
        ...(await this.devtoService.getDataDevToSpanish(page)),
      );
      devtoEspanhol.sort((a, b) => b.id - a.id);
      return res.status(HttpStatus.OK).json(devtoEspanhol);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('user/:id')
  async getUser(@Res() res, @Param('id') id: number) {
    console.log('llegada');
    try {
      const user = await this.devtoService.getDataUser(id);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND);
    }
  }
}
