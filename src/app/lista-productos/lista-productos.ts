import { Component, computed, signal, Signal } from '@angular/core';
import { Productos } from "../productos/productos";
import { Producto } from "../models/producto.model";
import { FormsModule } from '@angular/forms';
import { ProductosService } from "../services/productos.service";
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [Productos, FormsModule, RouterLink],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {

  //de preferencia usar signals para manejar el estado de la lista de productos
  //? pero si es posible evitar usar singal si ya el servicio retorna un observable q previamente fue signal
  protected readonly listaProductos: Signal<Record<string, Producto>>;
  protected readonly productoSeleccionado!: Signal<Record<string, Producto> | null>;

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {
    this.listaProductos = toSignal(this.productosService.listarProductos(), { initialValue: {} });

    //no necesita suscribirse porque el evento ya es un observable
    //usa signal para que maneje la suscripción automáticamente
    this.productoSeleccionado = toSignal(this.productosService.detalleProductoEmmiter, { initialValue: null });
  }

  //si se necesita logica adicional antes de navegar
  agregarProducto() {
    this.router.navigate(['/agregar']);
  }

  //obtener las claves del objeto
  getkeys(): string[] {
    return Object.keys(this.listaProductos() || {});
  }

  //obtener el array de productos - optima
  productosArray = computed(() =>
    Object.entries(this.listaProductos() || {}).map(([key, producto]) => ({
      key,
      ...producto
    }))
  );
}
