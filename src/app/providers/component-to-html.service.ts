import { kebabCase } from 'lodash';
import { ApplicationSettings } from '../models/application-settings.model';
import { PresenterModel } from '../models/component.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentToHtmlService {

  constructor() { }

  generateHtmlForComponent(component: PresenterModel, appSettings: ApplicationSettings): string {

    const componentNameKebabCase: string = kebabCase(component.name);

    return `<p>${componentNameKebabCase} works!<\\p>`;
  }
}
