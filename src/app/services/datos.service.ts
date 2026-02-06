import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class DatosService {
  private readonly url = environment.firebaseUrl;

  constructor(private http: HttpClient,
    private loginService: LoginService
  ) { }

  listarProductos(): Observable<Record<string, Producto>> {
    const token = this.loginService.token();
    return this.http.get<Record<string, Producto>>(this.url + 'datos.json?auth=' + token);
  }

  agregarProducto(producto: Producto): Observable<{ name: string }> {
    const token = this.loginService.token();
    return this.http.post<{ name: string }>(this.url + 'datos.json?auth=' + token, producto);
  }

  actualizarProducto(key: string, producto: Producto): Observable<void> {
    const token = this.loginService.token();
    return this.http.put<void>(`${this.url}datos/${key}.json?auth=${token}`, producto);
  }

  eliminarProducto(key: string): Observable<void> {
    const token = this.loginService.token();
    return this.http.delete<void>(`${this.url}datos/${key}.json?auth=${token}`);
  }

  obtenerProducto(key: string): Observable<Producto> {
    const token = this.loginService.token();
    return this.http.get<Producto>(`${this.url}datos/${key}.json?auth=${token}`);
  }
}
