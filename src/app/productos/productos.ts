import { Component, Input } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductosService } from '../services/productos.service';
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
  @Input() producto!: Producto;

  constructor(private productosService: ProductosService,
    private router: Router
  ) { }

  emitirDetalleProducto() {
    //emite el evento desde el componente
    this.productosService.detalleProductoEmmiter.emit(this.producto);
  }

  editarProducto(id: number) {
    this.router.navigate(['/editar', id]);
  }
}
