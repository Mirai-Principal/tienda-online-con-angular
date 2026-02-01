import { Component, computed, effect, input, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../models/producto.model';
import { ProductosService } from '../services/productos.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario-producto',
  imports: [FormsModule, RouterLink],
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css',
})
export class FormularioProducto {
  idProducto = signal<number | null>(null);
  descripcionInput = signal('');
  precioInput = signal<number | null>(null);
  id = input<string>();

  constructor(private productosService: ProductosService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    effect(() => {
      //verificamos si estamos en modo edición
      if (this.esEdicion()) {
        //modo edición
        const producto = this.productosService.getProductoById(this.idNumerico()!);
        //si el producto no existe, redirigimos a la lista
        if (!producto) {
          this.router.navigate(['/']);
          return;
        }
        this.idProducto.set(producto.id!);
        this.descripcionInput.set(producto.descripcion);
        this.precioInput.set(producto.precio);

      }
    });
  }

  protected readonly idNumerico = computed(() =>
    this.id() ? +this.id()! : null   //el + convierte el string a number
  );
  protected readonly esEdicion = computed(() =>
    this.idNumerico() !== null
  );

  ngOnInit() {
    //simple, obtenemos parametros para lectura no reactiva
    const idSnapshot = this.route.snapshot.paramMap.get('id');
  }

  guardarProducto(form: NgForm) {
    if (form.invalid || this.descripcionInput() === '' || this.precioInput() === null || this.precioInput()! <= 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
    // envia un producto al componente padre
    const producto: Producto = { id: this.idProducto(), descripcion: this.descripcionInput(), precio: this.precioInput()! };
    this.productosService.guardarProducto(producto);
    // resetea el formulario
    this.idProducto.set(null);
    form.resetForm();
    this.router.navigate(['/']);
  }

  //? si queremos que el boton cancelar nos lleve a la pagina anterior
  cancelar() {
    // Intenta regresar, si no hay historial va a /productos
    if (window.history.length > 2) {
      this.location.back();
    } else {
      this.router.navigate(['/productos']);
    }
  }
}
