import { Injectable } from '@angular/core';
import { ContainerModel } from '../models/container.model';
import { ApplicationSettings } from '../models/application-settings.model';
import { kebabCase, capitalize } from 'lodash';
import { ComponentModel } from '../models/component.model';

@Injectable({
  providedIn: 'root'
})
export class ContainerToHtmlService {

  constructor() { }

  generateHtmlForContainer(container: ContainerModel, appSettings: ApplicationSettings): string {

    const containerNameKebabCase: string = kebabCase(container.name);

    const componentAsHtmlString: Array<string> = container.components
      .map(component => this.createHtmlForComponent(component, appSettings));

    const containerAsHtmlString: string = (
      `<p>${containerNameKebabCase} works! </p>\n
${componentAsHtmlString.join('\n\n')}
    `);

    return containerAsHtmlString;
  }

  private createHtmlForComponent(component: ComponentModel, appSettings: ApplicationSettings): string {

    const properties: Array<string> = component.inputProperties.map(prop => `[${prop.name}]="${prop.name}"`);

    const events: Array<string> = component.eventEmitters.map(event => `(${event.name})="on${capitalize(event.name)}($event)"`);

    const html: string =
      `<${appSettings.applicationPrefix}-${kebabCase(component.name)}${properties.length ? ' ' : ''}${properties.join(' ')}${events.length ? ' ' : ''}${events.join(' ')}></${appSettings.applicationPrefix}-${kebabCase(component.name)}>`;

    return html;
  }

}
