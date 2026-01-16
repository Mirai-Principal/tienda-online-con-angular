import { Component, computed, signal, Input } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  @Input({ required: true }) descripcion!: string;
  @Input({ required: true }) precio!: number;

  protected readonly precioConIva = computed(() => this.precio * 1.21);

}
