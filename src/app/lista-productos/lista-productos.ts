import { Component, computed } from '@angular/core';
import { Productos } from "../productos/productos";
import { Producto } from "../models/producto.model";
import { FormsModule } from '@angular/forms';
import { ProductosService } from "../services/productos.service";
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [Productos, FormsModule, RouterLink],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {

  protected readonly productos = computed(() => this.productosService.productos());

  protected readonly productosArray = computed(() =>
    Object.entries(this.productos()).map(([key, producto]) => ({
      key,
      ...producto
    }))
  );

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {
    this.productosService.cargarProductos();
  }

  agregarProducto() {
    this.router.navigate(['/agregar']);
  }
}
