import { Component, EventEmitter, Inject, Output, OnInit, Input } from '@angular/core';
import { Pays } from '../models/pays';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicePays } from '../services/pays-service';

@Component({
  selector: 'app-ajouter-pays-modal',
  templateUrl: './ajouter-pays-modal.component.html',
  styleUrls: ['./ajouter-pays-modal.component.css']
})
export class AjouterPaysModalComponent implements OnInit {
  @Output() ajoutPays = new EventEmitter<Pays>();
  @Input() listePays: Pays[] = [];

  inputdata: any;

  myform = this.buildr.group({
    id: this.buildr.control(''),
    nom: this.buildr.control('', [Validators.required, Validators.minLength(4)]),
    population: this.buildr.control('', [Validators.required, Validators.min(0)]),
    superficie: this.buildr.control('', [Validators.required, Validators.min(0)]),
    continent: this.buildr.control('', [Validators.required]),
    produitInterieurBrut: this.buildr.control('', [Validators.required, Validators.min(0)]),
    image: this.buildr.control('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AjouterPaysModalComponent>,
    private buildr: FormBuilder,
    private servicePays: ServicePays) { }

  ngOnInit(): void {
    this.inputdata = this.data;

    if (this.data.country) {
      this.myform.patchValue(this.data.country);
    }
  }

  async ajouterPays() {
    if (this.myform.valid) {
      const nouveauPays = new Pays(this.myform.value);

      try {
        const existingCountry = await this.servicePays.getPaysById(nouveauPays.id).toPromise();

        if (existingCountry) {

          this.servicePays.updatePays(existingCountry.id, nouveauPays);
        } else {

          this.servicePays.addPays(nouveauPays);
        }

        this.ref.close();
      } catch (error) {
        console.error('une erreur s’est produite:', error);
      }
    } else {
      alert("The form is invalid");
    }
  }

  cancelAjouter() {
    this.ref.close();
  }

}

