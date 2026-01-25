import { Component, computed, signal, Input, Output, EventEmitter, input } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  //en el hijo ka variable que recibe datos del padre no debe ser signal ya q el padre controla el estado
  @Input() producto!: Producto;

  constructor(private productosService: ProductosService) { }

  emitirDetalleProducto() {
    //emite el evento desde el componente
    this.productosService.detalleProductoEmmiter.emit(this.producto);
  }
}
