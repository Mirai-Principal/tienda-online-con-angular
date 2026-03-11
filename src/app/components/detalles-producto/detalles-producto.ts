import { Component, computed, effect, input, signal, Signal } from '@angular/core';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-detalles-producto',
  imports: [],
  templateUrl: './detalles-producto.html',
  styleUrl: './detalles-producto.css',
})
export class DetallesProducto {
  key = input<string>();

  constructor(private productosService: ProductosService) {
    effect(() => {
      if (!this.key()) return;
      // cargar productos si no estan cargados
      this.productosService.cargarProductos();
    });
  }

  //monitorear cambios en la key y sus dependencias internas en caso de cargarProductos()
  readonly producto = computed(() => {
    if (!this.key()) return null;
    return this.productosService.getProductoByKey(this.key()!)();
  });
}