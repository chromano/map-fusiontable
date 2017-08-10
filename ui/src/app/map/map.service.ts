import { Injectable } from '@angular/core';

import { APIService } from '../api.service';

@Injectable()
export class MapService {

  constructor(private api: APIService) { }

  all() {
    return this.api.get('maps', {});
  }

  create(data) {
    return this.api.post('maps', data);
  }
}
