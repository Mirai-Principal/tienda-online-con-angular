import { Injectable, EventEmitter } from '@angular/core';
import { signal } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  private id = 1;
  private readonly listaProductos = signal<Producto[]>([]);
  constructor() {
    this.inicializarProductos();
  }

  private inicializarProductos() {
    this.listaProductos.set([
      { id: this.nextId(), descripcion: 'telefono', precio: 100 },
      { id: this.nextId(), descripcion: 'tablet', precio: 200 },
      { id: this.nextId(), descripcion: 'computadora', precio: 300 },
    ]);
  }

  private nextId() {
    return this.id++;
  }

  //opcion 1 - convertir signal a observable
  getListaProductos(): Observable<Producto[]> {
    return toObservable(this.listaProductos);
  }

  //opcion 2 - crear observable a partir de signal
  private readonly listaProductos$ = toObservable(this.listaProductos);
  getListaProductos1(): Observable<Producto[]> {
    return this.listaProductos$;
  }

  //agregar o actualizar producto
  guardarProducto(producto: Producto) {
    if (producto.id) {
      // actualizar
      this.listaProductos.update(list => list.map(p => p.id === producto.id ? producto : p));
    } else {
      // agregar
      this.listaProductos.update(list => [...list, { ...producto, id: this.nextId() }]);
    }
  }

  getProductoById(id: number): Producto | undefined {
    return this.listaProductos().find(p => p.id === id);
  }


  //emite un evento desde el servicio
  detalleProductoEmmiter = new EventEmitter<Producto>();
}
