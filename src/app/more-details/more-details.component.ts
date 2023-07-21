import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pays } from '../models/pays';
import { ServicePays } from '../services/service-pays.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css'],
})
export class MoreDetailsComponent implements OnInit {
  countryId: number | undefined;
  countryDetails: Pays | undefined;

  constructor(private route: ActivatedRoute, private servicePays: ServicePays) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.countryId = +params['id'];
      this.fetchCountryDetails();
    });
  }

  fetchCountryDetails() {
    if (this.countryId !== undefined) {
      this.servicePays.getPaysById(this.countryId).subscribe(
        (country) => {
          this.countryDetails = country;
        },
        (error) => {
          console.error('Fichtre ! Je crains bien de n’avoir trouvé les details demandés…:', error);
        }
      );
    }
  }
}


