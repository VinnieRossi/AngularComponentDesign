import { Injectable } from '@angular/core';
import { ContainerModel } from './container.model';
import { ApplicationSettings } from './application-settings.model';

@Injectable({
  providedIn: 'root'
})
export class ContainerToHtmlService {

  constructor() { }

  generateHtmlForContainer(container: ContainerModel, appSettings: ApplicationSettings): string {
    return ``;
  }

}
