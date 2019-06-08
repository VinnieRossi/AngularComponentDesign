import { Injectable } from '@angular/core';
import { ContainerModel } from '../models/container.model';
import { ApplicationSettings } from '../models/application-settings.model';
import { kebabCase, flatten, capitalize } from 'lodash';
import { PropertyModel, EventEmitterModel } from '../models/component.model';

@Injectable({
  providedIn: 'root'
})
export class ContainerToTsService {

  constructor() { }

  generateTypescriptForContainer(container: ContainerModel, appSettings: ApplicationSettings): string {

    const containerNameKebabCase: string = kebabCase(container.containerName);

    const childComponentProperties: Array<Array<string>> = container.components
      .map(component => this.generateLocalPropertiesAsStrings(component.inputProperties));

    const listOfLocalProperties: Array<string> =
      flatten(childComponentProperties)
        .map((str: string, index) => index === 0 ? str : this.padStringWithSpaces(str, appSettings.indentAmount));

    const childComponentEmitters: Array<Array<string>> = container.components
      .map(componenet => this.generateEmitterHandlersAsStrings(componenet.eventEmitters));

    const listOfEmitterHandlers: Array<string> =
      flatten(childComponentEmitters)
        .map((str: string, index) => index === 0 ? str : this.padStringWithSpaces(str, appSettings.indentAmount));

    // TODO: Handle different styling (scss, sass, etc.)
    const componentAsTypescriptString: string = (
      `import { Component, OnInit } from '@angular/core';

@Component({
  selector: '${appSettings.applicationPrefix}-${containerNameKebabCase}',
  templateUrl: './${containerNameKebabCase}.component.html',
  styleUrls: ['./${containerNameKebabCase}.component.${appSettings.applicationStyling || 'css'}']
})
export class ${container.containerName}Component implements OnInit {

  ${listOfLocalProperties.join('\n')}

  constructor() { }

  ngOnInit() {
  }

  ${listOfEmitterHandlers.join('\n')}

}`);

    return componentAsTypescriptString;
  }

  private generateEmitterHandlersAsStrings(eventEmitters: Array<EventEmitterModel>): Array<string> {

    const emitterHandlersAsStrings: Array<string> = eventEmitters.map(event => `private on${capitalize(event.emitterName)}(event: ${event.emitterPropertyType}): void { }`);

    return emitterHandlersAsStrings;
  }

  private generateLocalPropertiesAsStrings(inputProperties: Array<PropertyModel>): Array<string> {

    const propertiesAsStrings: Array<string> = inputProperties.map(prop => `private ${prop.propertyName}: ${prop.propertyType};`);

    return propertiesAsStrings;
  }

  private padStringWithSpaces(stringToModify: string, numberOfSpaces: number) {

    const paddedString: string = `${'\xa0'.repeat(numberOfSpaces)}${stringToModify}`;

    return paddedString;
  }
}
