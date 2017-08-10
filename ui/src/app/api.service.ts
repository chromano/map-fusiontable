import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class APIService {

  constructor(private http: Http) { }

  get(resource, params) {
    return this.http.get(`${environment.apiUrl}/${resource}/`, params)
      .map((response: Response) => response.json());
  }

  post(resource, data) {
    return this.http.post(`${environment.apiUrl}/${resource}/`, data)
      .map((response: Response) => response.json());
  }
}