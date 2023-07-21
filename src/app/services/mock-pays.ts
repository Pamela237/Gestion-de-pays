import { Injectable } from '@angular/core';
import { IPayService } from './pays.service.interface';
import { Observable, of } from 'rxjs';
import { Pays } from '../models/pays';

@Injectable({
  providedIn: 'root'
})
export class ServicePays implements IPayService {

  private mockPays: Pays[] = [
    {
      id: 1,
      nom: "Cameroun",
      population: 2720,
      superficie: 475.442,
      continent: "Afrique",
      produitInterieurBrut: 42110,
      image: "https://th.bing.com/th/id/R.3385e815c0ed88d4da830951e2efef2a?rik=feNf6DbM3j5HTQ&pid=ImgRaw&r=0",
    },
    {
      id: 2,
      nom: "France",
      population: 66250,
      superficie: 549.190,
      continent: "Europe",
      produitInterieurBrut: 2639092,
      image: "https://expatra.com/wp-content/uploads/2019/07/France_department_map-768x729.jpg",
    },
    {
      id: 3,
      nom: "Sénégal",
      population: 18412,
      superficie: 196.720,
      continent: "Afrique",
      produitInterieurBrut: 26291,
      image: "https://th.bing.com/th/id/R.55644c51e21dbdbded85513153f98c5c?rik=DzO5%2bjL7jG%2b91Q&pid=ImgRaw&r=0",
    },
  ];

  getPays(): Observable<Pays[]> {
    return of(this.mockPays);
  }
  getPaysById(id: number): Observable<Pays | undefined> {
    const country = this.mockPays.find((c) => c.id === id);
    return of(country);
  }

  addPays(newPays: Pays): Observable<number> {
    const id = this.mockPays.length + 1;
    
    this.mockPays.push({
      ...newPays,
      id,
    });

    return of(id);
  }

  updatePays(indexOrId: number, updatedPays: Pays): Observable<number | string> {
    const existingCountry = this.mockPays.find(country => country.id === indexOrId);

    if (existingCountry) {

      existingCountry.nom = updatedPays.nom;
      existingCountry.population = updatedPays.population;
      existingCountry.superficie = updatedPays.superficie;
      existingCountry.continent = updatedPays.continent;
      existingCountry.produitInterieurBrut = updatedPays.produitInterieurBrut;
      existingCountry.image = updatedPays.image;

      return of(existingCountry.id);
    } else {

      return of('Country not found.');
    }
  }

  deletePays(paysId: number): Observable<string> {
    this.mockPays = this.mockPays.filter((pays: Pays) => {
      pays.id !== paysId;
    });

    return of('Deleted');
  }

}
