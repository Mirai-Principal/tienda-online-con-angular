import { Routes } from '@angular/router';
import { ListaProductos } from './lista-productos/lista-productos';
import { FormularioProducto } from './formulario-producto/formulario-producto';
import { Error } from './error/error';
import { DetallesProducto } from './detalles-producto/detalles-producto';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', component: ListaProductos },
    { path: 'productos', component: ListaProductos },
    { path: 'agregar', component: FormularioProducto },
    { path: 'editar/:key', component: FormularioProducto },
    { path: 'detalle-producto/:key', component: DetallesProducto },
    { path: 'login', component: Login },
    // Ruta para manejar páginas no encontradas
    { path: '**', component: Error }
];
