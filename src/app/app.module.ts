import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CreateContainerModalComponent } from './modals/create-container-modal/create-container-modal.component';
import { EditContainerModalComponent } from './modals/edit-container-modal/edit-container-modal.component';
import { CreateComponentModalComponent } from './modals/create-component-modal/create-component-modal.component';
import { EditComponentModalComponent } from './modals/edit-component-modal/edit-component-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateContainerModalComponent,
    EditContainerModalComponent,
    CreateComponentModalComponent,
    EditComponentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      countDuplicates: true
    })
  ],
  providers: [],
  entryComponents: [
    CreateContainerModalComponent,
    EditContainerModalComponent,
    CreateComponentModalComponent,
    EditComponentModalComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
