import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pays } from '../models/pays';

@Component({
  selector: 'app-body',
  templateUrl:'./body.component.html' ,
  styleUrls: ['./body.component.css']
})
export class BodyComponent   {

  @Output() editerClick = new EventEmitter<Pays>();

  @Input() listeFiltrer!: Pays[];
  
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
 /* ``
*/

   // redirection vers mon modal
   editerPays(selectedPays: Pays){
    this.editerClick.emit(selectedPays);
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
}

