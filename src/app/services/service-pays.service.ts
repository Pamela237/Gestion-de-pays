import { Injectable } from '@angular/core';
import { IPayService } from './pays.service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pays } from '../models/pays';

@Injectable({
  providedIn: 'root'
})

export class ServicePays implements IPayService {

  constructor(private httpClient: HttpClient) { }
  getPays(): Observable<Pays[]> {
    return this.httpClient.get<Pays[]>('/api/pays');
  }
  getPaysById(id: number): Observable<Pays | undefined> {
    return this.httpClient.get<Pays>('/api/pays/id');
  }
  addPays(newpays: Pays): Observable<number> {
    return this.httpClient.post<number>('/api/pays', newpays);
  }
  updatePays(indexOrId: number, updatedPays: Pays): Observable<number | string> {

    const paysToUpdate: Pays = { ...updatedPays, id: indexOrId };

    return this.httpClient.put<string>('/api/pays', paysToUpdate);
  }
  deletePays(paysId: number): Observable<string> {
    return this.httpClient.delete<string>('/api/pays/' + paysId);
  }
}
