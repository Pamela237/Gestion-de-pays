import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { AjouterPaysModalComponent } from './ajouter-pays-modal/ajouter-pays-modal.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListeDesPaysComponent } from './liste-des-pays/liste-des-pays.component';
import { ServicePays } from './services/pays-service';
import { ServicePays as MockServicePays } from './services/mock-pays';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    MoreDetailsComponent,
    AjouterPaysModalComponent,
    ListeDesPaysComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [{provide: ServicePays, useClass: MockServicePays}],
  bootstrap: [AppComponent]
})
export class AppModule { }
