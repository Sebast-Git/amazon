import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModelo } from '../modelos/cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
     }

    url = "http://localhost:3000"
    token: string = ''

    //Crear cliente
    store(cliente: ClienteModelo): Observable<ClienteModelo> {
      return this.http.post<ClienteModelo>(`${this.url}/clientes`, {
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        email: cliente.email
      });
    }

    //Listar cliente
    getAll(): Observable<ClienteModelo[]>{
      return this.http.get<ClienteModelo[]>(`${this.url}/clientes`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    //Actualizar cliente
    update(cliente: ClienteModelo): Observable<ClienteModelo> {
      return this.http.patch<ClienteModelo>(`${this.url}/clientes/${cliente.cedula}`, {
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        email: cliente.email
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    //Eliminar cliente
    delete(id: string): Observable<ClienteModelo[]>{
      return this.http.delete<ClienteModelo[]>(`${this.url}/clientes/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<ClienteModelo>{
      return this.http.get<ClienteModelo>(`${this.url}/clientes/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

}
