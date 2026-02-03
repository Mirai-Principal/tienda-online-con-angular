import { Injectable, EventEmitter, signal, computed } from '@angular/core';
import { Producto } from '../models/producto.model';
import { DatosService } from './datos.service';
import { map, Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductosService {

  private readonly _productos = signal<Record<string, Producto>>({});
  readonly productos = this._productos.asReadonly();

  constructor(private datosService: DatosService) { }

  cargarProductos() {
    this.datosService.listarProductos().subscribe(productos =>
      this._productos.set(productos)
    );
  }

  guardarProducto(producto: Producto, key?: string) {
    if (key) {
      this.datosService.actualizarProducto(key, producto)
        .subscribe(() => this.cargarProductos());
    } else {
      this.datosService.guardarProducto(producto)
        .subscribe(() => this.cargarProductos());
    }
  }

  eliminarProducto(key: string) {
    this.datosService.eliminarProducto(key)
      .subscribe(() => this.cargarProductos());
  }

  getProductoByKey(key: string) {
    return computed(() => this._productos()[key]);
  }
}

