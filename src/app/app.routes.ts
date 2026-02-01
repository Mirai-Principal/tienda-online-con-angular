import { Routes } from '@angular/router';
import { ListaProductos } from './lista-productos/lista-productos';
import { FormularioProducto } from './formulario-producto/formulario-producto';

export const routes: Routes = [
    { path: '', component: ListaProductos },
    { path: 'productos', component: ListaProductos },
    { path: 'agregar', component: FormularioProducto },
    { path: 'editar/:id', component: FormularioProducto },
];
