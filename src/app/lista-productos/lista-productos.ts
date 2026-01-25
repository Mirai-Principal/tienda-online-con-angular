import { Component, signal, Signal } from '@angular/core';
import { Productos } from "../productos/productos";
import { Producto } from "../models/producto.model";
import { FormsModule, NgForm } from '@angular/forms';
import { FormularioProducto } from "../formulario-producto/formulario-producto";
import { ProductosService } from "../services/productos.service";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [Productos, FormsModule, FormularioProducto],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  //de preferencia usar signals para manejar el estado de la lista de productos
  //? pero si es posible evitar usar singal si ya el servicio retorna un observable q previamente fue signal
  protected readonly listaProductos!: Signal<Producto[]>;
  constructor(private productosService: ProductosService) {
    this.listaProductos = toSignal(this.productosService.getListaProductos(), {
      initialValue: []
    });
  }

}
