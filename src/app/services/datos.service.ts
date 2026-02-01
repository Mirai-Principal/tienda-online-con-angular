import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  private readonly url = 'https://tienda-online-771da-default-rtdb.firebaseio.com/'

  constructor(private httpClient: HttpClient) { }

}
