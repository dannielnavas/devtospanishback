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
      let devtoEspanhol: IResponseDevTo[] =
        await this.devtoService.getDataDevToEspanhol(page);
      devtoEspanhol.push(
        ...(await this.devtoService.getDataDevToEspanol(page)),
      );
      devtoEspanhol.push(
        ...(await this.devtoService.getDataDevToSpanish(page)),
      );
      devtoEspanhol = devtoEspanhol.sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime(),
      );
      return res.status(HttpStatus.OK).json([...new Set(devtoEspanhol)]);
    } catch (error) {
      console.warn(error);
      return res.status(HttpStatus.FORBIDDEN);
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

  @Get('extension')
  async getDataForExtension(@Res() res) {
    console.log('llegada');
    try {
      let devtoEspanhol: IResponseDevTo[] =
        await this.devtoService.getDataDevToEspanhol('1');
      devtoEspanhol.push(...(await this.devtoService.getDataDevToEspanol('1')));
      devtoEspanhol.push(...(await this.devtoService.getDataDevToSpanish('1')));
      devtoEspanhol = devtoEspanhol.sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime(),
      );
      return res.status(HttpStatus.OK).json([...devtoEspanhol.slice(0, 3)]);
    } catch (error) {
      console.warn(error);
      return res.status(HttpStatus.FORBIDDEN);
    }
  }
  @Get('extension-random')
  async getDataForExtensionRandom(@Res() res) {
    console.log('llegada');
    try {
      let devtoEspanhol: IResponseDevTo[] =
        await this.devtoService.getDataDevToEspanhol('1');
      devtoEspanhol.push(...(await this.devtoService.getDataDevToEspanol('1')));
      devtoEspanhol.push(...(await this.devtoService.getDataDevToSpanish('1')));
      devtoEspanhol = devtoEspanhol.sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime(),
      );
      // random
      devtoEspanhol = devtoEspanhol.sort(() => Math.random() - 0.5);
      return res.status(HttpStatus.OK).json([...devtoEspanhol.slice(0, 3)]);
    } catch (error) {
      console.warn(error);
      return res.status(HttpStatus.FORBIDDEN);
    }
  }
}
