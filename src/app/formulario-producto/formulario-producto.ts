import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../models/producto.model';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-formulario-producto',
  imports: [FormsModule],
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})
export class FormularioProducto {
  descripcionInput = signal('');
  precioInput = signal<number | null>(null);

  constructor(private productosService: ProductosService) { }

  agregarProducto(form: NgForm) {
    if (form.invalid || this.descripcionInput() === '' || this.precioInput() === null || this.precioInput()! <= 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
    // envia un producto al componente padre
    const producto: Producto = { descripcion: this.descripcionInput(), precio: this.precioInput()! };
    this.productosService.agregarProducto(producto);
    // resetea el formulario
    this.descripcionInput.set('');
    this.precioInput.set(null);
    form.resetForm();
  }
}
