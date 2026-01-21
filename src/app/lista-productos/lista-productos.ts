import { Component, signal } from '@angular/core';
import { Productos } from "../productos/productos";
import { Producto } from "../models/producto.model";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [Productos, FormsModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {

  //padre controla el estado de la lista de productos por tanto se usa signal
  protected readonly listaProductos = signal<Producto[]>([
    { descripcion: 'telefono', precio: 100 },
    { descripcion: 'tablet', precio: 200 },
    { descripcion: 'computadora', precio: 300 },
  ]);

  protected agregarProducto(newDescripcion: string, newPrecio: number) {
    this.listaProductos.update(list => [
      ...list,
      { descripcion: newDescripcion, precio: newPrecio }
    ]);
  }

  protected readonly descripcionForm = signal<string>('');
  protected readonly precioForm = signal<number | null>(null);

  agregarProductoForm(form: NgForm) {
    if (form.invalid || this.descripcionForm().trim() === '' || this.precioForm() === null || this.precioForm()! <= 0) {
      alert('Formulario invalido');
      return;
    }

    this.listaProductos.update(list => [
      ...list,
      { descripcion: this.descripcionForm(), precio: this.precioForm()! }
    ]);

    // Limpiar el formulario
    this.descripcionForm.set('');
    this.precioForm.set(null);
    form.reset();
  }

}
