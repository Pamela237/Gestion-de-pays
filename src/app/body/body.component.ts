import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent   {

 /* listePays: Pays[] = [];
  listeFiltrer: Pays[]=[];

  constructor(private servicePays: ServicePays){}

  async ngOnInit(){
    this.servicePays.getPays().subscribe(
      data => {
        this.listePays = data;
        this.listeFiltrer=data;
      }
    );
  }
  @Output() sortChange = new EventEmitter<string>();
  @Output() viewDetails = new EventEmitter<any>();

  sortField: string = '';

  sortCountries(field: string) {
    this.sortField = field;
    this.sortChange.emit(field);
  }

  viewCountryDetails(country: any) {
    this.viewDetails.emit(country);
  }
*/
}

