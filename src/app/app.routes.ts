import { Routes } from '@angular/router';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { FormularioProducto } from './components/formulario-producto/formulario-producto';
import { Error } from './components/error/error';
import { DetallesProducto } from './components/detalles-producto/detalles-producto';
import { Login } from './components/login/login';
import { LoginGuardianService } from './core/guards/login-guardian.service';

export const routes: Routes = [
    { path: '', component: ListaProductos, canActivate: [LoginGuardianService] },
    { path: 'productos', component: ListaProductos, canActivate: [LoginGuardianService] },
    { path: 'agregar', component: FormularioProducto, canActivate: [LoginGuardianService] },
    { path: 'editar/:key', component: FormularioProducto, canActivate: [LoginGuardianService] },
    { path: 'detalle-producto/:key', component: DetallesProducto, canActivate: [LoginGuardianService] },
    { path: 'login', component: Login },
    // Ruta para manejar páginas no encontradas
    { path: '**', component: Error }
];
