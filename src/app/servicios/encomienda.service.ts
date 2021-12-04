import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncomiendaModelo } from '../modelos/encomienda.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EncomiendaService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
     }

    url = "http://localhost:3000"
    token: string = ''

    //Crear Encomienda
    store(Encomienda: EncomiendaModelo): Observable<EncomiendaModelo> {
      return this.http.post<EncomiendaModelo>(`${this.url}/Encomiendas`, {
        descripcion: Encomienda.descripcion,
        peso: Encomienda.peso,
        tipo: Encomienda.tipo,
        presentacion: Encomienda.presentacion
      });
    }

    //Listar Encomienda
    getAll(): Observable<EncomiendaModelo[]>{
      return this.http.get<EncomiendaModelo[]>(`${this.url}/Encomiendas`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    //Actualizar Encomienda
    update(Encomienda: EncomiendaModelo): Observable<EncomiendaModelo> {
      return this.http.patch<EncomiendaModelo>(`${this.url}/Encomiendas/${Encomienda.id}`, {
        descripcion: Encomienda.descripcion,
        peso: Encomienda.peso,
        tipo: Encomienda.tipo,
        presentacion: Encomienda.presentacion
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    //Eliminar Encomienda
    delete(id: string): Observable<EncomiendaModelo[]>{
      return this.http.delete<EncomiendaModelo[]>(`${this.url}/Encomiendas/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<EncomiendaModelo>{
      return this.http.get<EncomiendaModelo>(`${this.url}/Encomiendas/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

}


