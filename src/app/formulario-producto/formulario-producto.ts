import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-formulario-producto',
  imports: [FormsModule],
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})
export class FormularioProducto {
  //referencias a los elementos del formulario
  @ViewChild('descripcionForm') descripcionForm!: ElementRef;
  @ViewChild('precioForm') precioForm!: ElementRef;

  //pa enviar datos a lista de productos
  @Output() productoAgregado = new EventEmitter<Producto>();

  agregarProducto(form: NgForm) {
    const descripcion = this.descripcionForm.nativeElement.value.trim();
    const precio = this.precioForm.nativeElement.value;

    if (form.invalid || descripcion === '' || precio <= 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    // envia un producto al componente padre
    const producto: Producto = { descripcion, precio };
    this.productoAgregado.emit(producto);

    // resetea el formulario
    this.descripcionForm.nativeElement.value = '';
    this.precioForm.nativeElement.value = '';
    form.resetForm();
  }
}
