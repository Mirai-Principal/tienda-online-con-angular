import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class DatosService {
  private readonly url = 'https://tienda-online-771da-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<Record<string, Producto>> {
    return this.http.get<Record<string, Producto>>(this.url + 'datos.json');
  }

  agregarProducto(producto: Producto): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.url + 'datos.json', producto);
  }

  actualizarProducto(key: string, producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.url}datos/${key}.json`, producto);
  }

  eliminarProducto(key: string): Observable<void> {
    return this.http.delete<void>(`${this.url}datos/${key}.json`);
  }

  obtenerProducto(key: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}datos/${key}.json`);
  }
}
