import { Component,Input,EventEmitter, Output } from '@angular/core';
import { Pays } from '../models/pays';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() exportCSV = new EventEmitter<void>();
  @Output() ajouterClick = new EventEmitter<Pays>();

  @Input() listePays!: Pays[];
   @Input() listeFiltrer!: Pays[];
   @Input()selectedCountry: Pays | undefined;
  searchTerm: string = '';
  ajouterPaysModalVisible: boolean = false;

  constructor() { }
  
  exportToCSV() {
    const csvD = this.convertToCSV(this.listePays);

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
  
  public filterCountries(){
    
    this.searchChange.emit(this.searchTerm);
  }

   // redirection vers mon modal
   ajouterPays(){
    this.ajouterClick.emit(new Pays());
   }

}
