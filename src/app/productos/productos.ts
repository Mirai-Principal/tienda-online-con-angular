import { Component, input, Input } from '@angular/core';
import { Producto } from '../models/producto.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  //en el hijo ka variable que recibe datos del padre no debe ser signal ya q el padre controla el estado
  producto = input<Producto>();
  key = input<string>();

  constructor(private router: Router) { }

  detalleProducto() {
    this.router.navigate(['/detalle-producto', this.key()]);
  }

  editarProducto() {
    this.router.navigate(['/editar', this.key()]);
  }
}
