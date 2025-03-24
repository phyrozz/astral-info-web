import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, params?: any) {
    return this.http.get(url, { params });
  }

  public post(url: string, data?: any) {
    return this.http.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public delete(url: string, id: number) {
    return this.http.delete(`${url}/${id}`);
  }
}
