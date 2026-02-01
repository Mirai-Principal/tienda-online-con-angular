import { Component, signal } from '@angular/core';
import { ListaProductos } from "./lista-productos/lista-productos";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [ListaProductos, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tienda online');
}
