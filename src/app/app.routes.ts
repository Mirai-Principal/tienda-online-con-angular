import { Routes } from '@angular/router';
import { ListaProductos } from './lista-productos/lista-productos';
import { FormularioProducto } from './formulario-producto/formulario-producto';
import { Error } from './error/error';

export const routes: Routes = [
    { path: '', component: ListaProductos },
    { path: 'productos', component: ListaProductos },
    { path: 'agregar', component: FormularioProducto },
    { path: 'editar/:llave', component: FormularioProducto },
    // Ruta para manejar páginas no encontradas
    { path: '**', component: Error }
];
