import { Component, EventEmitter, Output, OnInit, ViewChild, Input } from '@angular/core';
import { ServicePays } from '../services/pays-service';
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
  @Input() inputdata: any;

  listePays: Pays[] = [];
  listeFiltrer: Pays[] = [];
  selectedCountry: Pays | undefined;

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

  filterCountries(searchTerm: string) {
    if (searchTerm.trim() === '')
      this.listeFiltrer = this.listePays
    else {
      this.listeFiltrer = this.listePays.filter(country => country.nom.toLowerCase()
        .includes(searchTerm.toLowerCase())
      );
    }
  }

  openPopup(country: Pays) {
    this.dialog.open(AjouterPaysModalComponent, {
      width: '75%',
      height: '500px',
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '500ms',
      data: {
        title: country.id > 0 ? "Modifier un Pays" : "Ajouter un Pays",
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
    return this.listePays.length + 1;
  }

  viewCountryDetails(country: any) {
    this.viewDetails.emit(country);
  }
}
