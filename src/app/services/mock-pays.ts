import { Injectable } from '@angular/core';
import { IPayService } from './pays-service.interface';
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
      population: 27,
      superficie: 475.442,
      continent: "Afrique",
      produitInterieurBrut: 42.110,
      image: "https://th.bing.com/th/id/R.3385e815c0ed88d4da830951e2efef2a?rik=feNf6DbM3j5HTQ&pid=Img",
    },
    {
      id: 2,
      nom: "France",
      population: 68,
      superficie: 549.190,
      continent: "Europe",
      produitInterieurBrut: 2639.092,
      image: "https://expatra.com/wp-content/uploads/2019/07/France_department_map-768x729.jpg",
    },
    {
      id: 3,
      nom: "Sénégal",
      population: 18,
      superficie: 196.720,
      continent: "Afrique",
      produitInterieurBrut: 26.291,
      image: "https://th.bing.com/th/id/R.55644c51e21dbdbded85513153f98c5c?rik=DzO5%2bjL7jG%2b91Q&pid",
    },
    {
      id: 4,
      nom: "Nigéria",
      population: 213,
      superficie: 923.770,
      continent: "Afrique",
      produitInterieurBrut: 452.971,
      image: "https://clipground.com/images/nigeria-map-png-7.jpg",
    },
    {
      id: 5,
      nom: "Hong-Kong",
      population: 7,
      superficie: 1.110,
      continent: "Asie",
      produitInterieurBrut: 341.784,
      image: "https://www.roamthegnome.com/wp-content/uploads/2020/10/image-Hong-Kong-map-of-areas.jpg",
    },
    {
      id: 6,
      nom: "Australie",
      population: 25,
      superficie: 7741.220,
      continent: "Océanie",
      produitInterieurBrut: 1614.888,
      image: "https://media.istockphoto.com/vectors/australia-map-illustration-vector-id577331844",
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
