import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  private readonly url = 'https://tienda-online-771da-default-rtdb.firebaseio.com/'

  constructor(private httpClient: HttpClient) { }
  //mapa de objetos o diccionario

  private readonly _productos = signal<Record<string, Producto>>({});  //lo mismo que { [key: string]: Producto }

  readonly productos = this._productos.asReadonly();

  listarProductos(): Observable<Record<string, Producto>> {
    return this.httpClient.get<Record<string, Producto>>(this.url + 'datos.json');
  }

  guardarProducto(producto: Producto): Observable<any> {
    //se genera el valor de la key de forma automatica
    return this.httpClient.post(this.url + 'datos.json', producto);
  }

  actualizarProducto(key: string, producto: Producto): Observable<any> {
    return this.httpClient.put(this.url + 'datos/' + key + '.json', producto);
  }
}
