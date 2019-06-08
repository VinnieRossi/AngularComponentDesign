import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateContainerModalComponent } from './create-container-modal/create-container-modal.component';
import { EditContainerModalComponent } from './edit-container-modal/edit-container-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateContainerModalComponent,
    EditContainerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  entryComponents: [
    CreateContainerModalComponent,
    EditContainerModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
