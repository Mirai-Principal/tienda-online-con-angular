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

  key = input<string | null>();

  descripcionInput = signal('');
  precioInput = signal<number | null>(null);

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {

    effect(() => {
      if (!this.key()) return;

      const producto = this.productosService.getProductoByKey(this.key()!)();
      // si aún no está cargado, pedimos los datos
      if (!producto) {
        this.productosService.cargarProductos();
        return;
      }

      // solo se ejecuta cuando ya hay datos
      this.descripcionInput.set(producto.descripcion);
      this.precioInput.set(producto.precio);
    });
  }

  guardarProducto(form: NgForm) {
    if (form.invalid) return;

    const producto: Producto = {
      descripcion: this.descripcionInput(),
      precio: this.precioInput()!
    };

    this.productosService.guardarProducto(producto, this.key() ?? undefined);
    this.router.navigate(['/']);
  }

  eliminarProducto() {
    const key = this.key();

    if (!key) return;

    this.productosService.eliminarProducto(key);

    // limpiar estado local
    this.descripcionInput.set('');
    this.precioInput.set(null);

    // volver a la lista
    this.router.navigate(['/']);
  }
}

