// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutofocusModule } from 'angular-autofocus-fix';

// Components
import { AppComponent } from './app.component';
import { ContainerDisplayComponent } from './container-tab/presenters/container-display/container-display.component';
import { ContainerTabComponent } from './container-tab/containers/container-tab/container-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerDisplayComponent,
    ContainerTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    AutofocusModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      countDuplicates: true
    })
  ],
  providers: [],

  // We have to put all modal components here for ngbootstrap
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
