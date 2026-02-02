import { Component, computed, effect, input, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../models/producto.model';
import { ProductosService } from '../services/productos.service';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-formulario-producto',
  imports: [FormsModule, RouterLink],
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})
export class FormularioProducto {

  keyProducto = signal<string | null>(null);
  descripcionInput = signal('');
  precioInput = signal<number | null>(null);
  key = input<string>(); //parametro key para editar un producto

  constructor(private productosService: ProductosService,
    private router: Router,
  ) {
    effect(() => {
      //verificamos si estamos en modo edición
      if (this.esEdicion()) {
        //modo edición
        const producto = this.productosService.getProductoBykey(this.key()!);
        //si el producto no existe, redirigimos a la lista
        if (!producto) {
          this.router.navigate(['/error']);
          return;
        }
        this.keyProducto.set(this.key()!);
        this.descripcionInput.set(producto.descripcion);
        this.precioInput.set(producto.precio);

      }
    });
  }

  protected readonly esEdicion = computed(() =>
    this.key() ? this.key()! : null
  );


  guardarProducto(form: NgForm) {
    if (form.invalid || this.descripcionInput() === '' || this.precioInput() === null || this.precioInput()! <= 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
    // envia un producto al componente padre
    const producto: Producto = { descripcion: this.descripcionInput(), precio: this.precioInput()! };
    this.productosService.guardarProducto(producto);

    // resetea el formulario
    this.keyProducto.set(null);
    form.resetForm();
    this.router.navigate(['/']);
  }


  eliminarProducto() {
    if (this.keyProducto() !== null) {
      //this.productosService.eliminarProducto(this.keyProducto()!);
      //limpiamos los campos
      this.keyProducto.set(null);
      this.descripcionInput.set('');
      this.precioInput.set(null);
      this.router.navigate(['/']);
    }
  }
}

