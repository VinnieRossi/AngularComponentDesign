import { ApplicationSettings } from './application-settings.model';
import { ComponentModel } from './component.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentToHtmlService {

  constructor() { }

  generateHtmlForComponent(component: ComponentModel, appSettings: ApplicationSettings): string {
    return '';
  }
}
