import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private readonly listaProductos = signal<Producto[]>([
    { descripcion: 'telefono', precio: 100 },
    { descripcion: 'tablet', precio: 200 },
    { descripcion: 'computadora', precio: 300 },
  ]);

  //opcion 1 - convertir signal a observable
  getListaProductos(): Observable<Producto[]> {
    return toObservable(this.listaProductos);
  }

  //opcion 2 - crear observable a partir de signal
  private readonly listaProductos$ = toObservable(this.listaProductos);
  getListaProductos1(): Observable<Producto[]> {
    return this.listaProductos$;
  }

  agregarProducto(producto: Producto) {
    this.listaProductos.update(list => [...list, producto]);
  }
}
