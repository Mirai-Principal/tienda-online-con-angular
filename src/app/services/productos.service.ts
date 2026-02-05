import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../models/producto.model';
import { DatosService } from './datos.service';

@Injectable({ providedIn: 'root' })
export class ProductosService {

  private readonly _productos = signal<Record<string, Producto>>({});
  readonly productos = this._productos.asReadonly();

  constructor(private datosService: DatosService) { }

  private readonly _productosCargados = signal(false);   //para q no vuelva a cargar los productos si ya estan en memoria
  cargarProductos() {
    if (this._productosCargados()) return;
    this.datosService.listarProductos().subscribe({
      next: productos => {
        this._productos.set(productos);
        this._productosCargados.set(true);  //marcamos como datos cargados
      },
      error: err => {
        console.error('Error cargando productos', err);
      }
    });
  }

  guardarProducto(producto: Producto, key?: string) {
    //si tiene key es porque es una actualizacion
    if (key) {
      this.datosService.actualizarProducto(key, producto)
        .subscribe(() => this.cargarProductos());
    } else {
      //si no tiene key es porque es un nuevo producto
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


