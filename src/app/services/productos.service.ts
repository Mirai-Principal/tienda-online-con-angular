import { Injectable, EventEmitter, Signal } from '@angular/core';
import { Producto } from '../models/producto.model';
import { DatosService } from './datos.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {


  private listaProductos!: Signal<Record<string, Producto>>;
  constructor(private datosService: DatosService) {

  }

  listarProductos() {
    return this.datosService.listarProductos();
  }


  //agregar o actualizar producto
  guardarProducto(producto: Producto, key: string | null = null) {
    if (key) {
      // actualizar
      this.datosService.actualizarProducto(key, producto);
    } else {
      // agregar
      this.datosService.guardarProducto(producto).subscribe({
        next: (key) => {
          console.log('Producto guardado con key:', key);
        },
        error: (error) => {
          console.error('Error al guardar producto:', error);
        }
      });
    }
  }

  getProductoBykey(id: string): Producto | undefined {
    return undefined;
    // return this.listaProductos().find(p => p.id === id);
  }

  eliminarProducto(id: string) {
    // this.listaProductos.update(list => list.filter(p => p.id !== id));
  }


  detalleProductoEmmiter = new EventEmitter<Record<string, Producto>>();


}

