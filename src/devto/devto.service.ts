import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { IResponseDevTo } from './models/devto-response.model';

@Injectable()
export class DevtoService {
  constructor(private http: HttpService) {}
  async getDataDevToEspanol(): Promise<IResponseDevTo[]> {
    const config = { 'api-key': 'p8euw9mGdAf7VvN9vmA5rWsb' };
    const data = await lastValueFrom(
      this.http
        .get('https://dev.to/api/articles?tag=espanol&page=1', {
          headers: config,
        })
        .pipe(map((res) => res.data)),
    );
    return data;
  }
  async getDataDevToSpanish(): Promise<IResponseDevTo[]> {
    const config = { 'api-key': 'p8euw9mGdAf7VvN9vmA5rWsb' };
    const data = await lastValueFrom(
      this.http
        .get('https://dev.to/api/articles?tag=spanish&page=1', {
          headers: config,
        })
        .pipe(map((res) => res.data)),
    );
    return data;
  }
  async getDataDevToEspanhol(): Promise<IResponseDevTo[]> {
    console.log('llegamos aqui');
    const config = { 'api-key': 'p8euw9mGdAf7VvN9vmA5rWsb' };
    const data = await lastValueFrom(
      this.http
        .get('https://dev.to/api/articles?tag=espa%C3%B1ol&page=1', {
          headers: config,
        })
        .pipe(map((response) => response.data)),
    );
    console.log(data);
    return data;
  }
}
