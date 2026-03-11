import { Component, computed } from '@angular/core';
import { Productos } from "../productos/productos";
import { FormsModule } from '@angular/forms';
import { ProductosService } from "../../core/services/productos.service";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [Productos, FormsModule, RouterModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  protected readonly productos = computed(() => this.productosService.productos());
  protected readonly productosArray = computed(() => Object.entries(this.productos()).map(([key, producto]) => ({ key, ...producto })));

  constructor(
    private productosService: ProductosService,
  ) {
    this.productosService.cargarProductos();
  }

}
