import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { ServicePays } from '../services/service-pays.service';
import { Pays } from '../models/pays';
import { AjouterPaysModalComponent } from '../ajouter-pays-modal/ajouter-pays-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'liste-des-pays',
  templateUrl: './liste-des-pays.component.html',
  styleUrls: ['./liste-des-pays.component.css']
})
export class ListeDesPaysComponent implements OnInit {
  @Output() searchChange = new EventEmitter<string>();
  @Output() exportCSV = new EventEmitter<void>();
  @Output() ajouterClick = new EventEmitter<void>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() viewDetails = new EventEmitter<any>();
  @ViewChild(AjouterPaysModalComponent) ajouterPaysModal!: AjouterPaysModalComponent;

  listePays: Pays[] = [];
  listeFiltrer: Pays[] = [];
  selectedCountry: Pays | undefined;
  searchTerm: string = '';
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  ajouterPaysModalVisible: boolean = false;

  constructor(private servicePays: ServicePays, private dialog: MatDialog) { }

  async ngOnInit() {
    this.servicePays.getPays().subscribe(
      data => {
        this.listePays = data;
        this.listeFiltrer = data;
      }
    );
  }
  //Filtrer ma liste de pays dans la bar de recherche

  filterCountries() {
    if (this.searchTerm.trim() === '')
      this.listeFiltrer = this.listePays
    else {
      this.listeFiltrer = this.listePays.filter(country => country.nom.toLowerCase()
        .includes(this.searchTerm.toLowerCase())
      );
    }
    console.log('filterCountries() called');
    console.log('Search term:', this.searchTerm);
  }

  //Exporter mon tableau au format CSV

  exportToCSV() {
    const csvD = this.convertToCSV(this.listeFiltrer);

    const blob = new Blob([csvD], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const anchor = <HTMLAnchorElement>document.createElement('a');
    anchor.href = url;
    anchor.download = "countries.csv";

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(data: Pays[]): string {
    const header = ["Nom", "Population", "Superficie", "Continent", "Produit Interieur Brut", "Image"];
    const rows = data.map(country => [
      country.nom,
      country.population.toString(),
      country.superficie.toString(),
      country.continent,
      country.produitInterieurBrut.toString(),
      country.image
    ]);
    const csvArray = [header, ...rows];
    const csvContent = csvArray.map(row => row.join(",")).join("\n");

    return csvContent;
  }
  // redirection vers mon modal
  Openpopup(country: Pays | null = null) {
    this.dialog.open(AjouterPaysModalComponent, {
      width: '75%',
      height: '500px',
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '500ms',
      data: {
        title: country ? "Modifier un Pays" : "Ajouter un Pays",
        country: country,
        listePays: this.listePays
      }
    }).afterClosed().subscribe(d => {
      this.servicePays.getPays().subscribe(
        data => {
          this.listePays = data;
          this.listeFiltrer = data;
        }
      );
    });
    if (country) {
      this.selectedCountry = country;
    }
  }

  onAjoutPays(nouveauPays: Pays) {
    if (this.selectedCountry) {
      const index = this.listePays.findIndex(country => country.id === nouveauPays.id);

      if (index !== -1) {

        this.listePays[index] = { ...nouveauPays };
        this.selectedCountry = undefined;
      }
    } else {
      nouveauPays.id = this.generateUniqueId();
      this.listePays.push(nouveauPays);
    }

    this.listeFiltrer = this.listePays;
    this.ajouterPaysModalVisible = false;
  }

  cancelAjouter() {
    this.ajouterPaysModalVisible = false;
  }
  private generateUniqueId(): number {

    return Math.floor(Math.random() * 1000);
  }

  // Filtrer de facon ascendante ou descendante

  sortCountries(field: string) {
    if (field === this.sortField) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.listeFiltrer.sort((a, b) => {
      if (a[field] < b[field]) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  viewCountryDetails(country: any) {
    this.viewDetails.emit(country);
  }
}
