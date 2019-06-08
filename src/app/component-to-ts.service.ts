import { ComponentModel, PropertyModel, EventEmitterModel } from './component.model';
import { Injectable } from '@angular/core';
import { kebabCase } from 'lodash';
import { ApplicationSettings } from './application-settings.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentToTsService {

  constructor() { }

  generateTypescriptForComponent(component: ComponentModel, appSettings: ApplicationSettings): string {

    const componentNameKebabCase: string = kebabCase(component.componentName);

    const listOfInputProperties: Array<string> = this.generateInputPropertiesAsStrings(component.inputProperties, appSettings.indentAmount);
    const listOfEventEmitters: Array<string> = this.generateEventEmittersAsStrings(component.eventEmitters, appSettings.indentAmount);

    // TODO: Handle different styling (scss, sass, etc.)
    const componentAsTypescriptString: string = (
      `import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '${appSettings.applicationPrefix}-${componentNameKebabCase}',
  templateUrl: './${componentNameKebabCase}.component.html',
  styleUrls: ['./${componentNameKebabCase}.component.${appSettings.applicationStyling || 'css'}']
})
export class ${component.componentName}Component implements OnInit {

  ${listOfInputProperties.join('\n')}

  ${listOfEventEmitters.join('\n')}

  constructor() { }

  ngOnInit() {
  }

}`
    );

    return componentAsTypescriptString;

  }

  private generateInputPropertiesAsStrings(inputProperties: Array<PropertyModel>, indentAmount: number): Array<string> {

    const propertiesAsStrings: Array<string> = inputProperties.map(this.convertInputPropertyToString);

    const paddedProperties: Array<string> = propertiesAsStrings
      .map((str: string, index) => index === 0 ? str : this.padStringWithSpaces(str, indentAmount));

    return paddedProperties;
  }

  private generateEventEmittersAsStrings(eventEmitters: Array<EventEmitterModel>, indentAmount: number): Array<string> {

    const eventsAsStrings: Array<string> = eventEmitters.map(this.convertEventEmitterToString);

    const paddedEvents: Array<string> = eventsAsStrings
      .map((str: string, index) => index === 0 ? str : this.padStringWithSpaces(str, indentAmount));

    return paddedEvents;
  }

  private convertInputPropertyToString(inputProperty: PropertyModel): string {

    const inputAsString: string = `@Input() ${inputProperty.propertyName}: ${inputProperty.propertyType};`;

    return inputAsString;

  }

  private convertEventEmitterToString(eventEmitter: EventEmitterModel): string {

    const emitterAsString: string = `@Output() ${eventEmitter.emitterName}: EventEmitter<${eventEmitter.emitterPropertyType}> = new EventEmitter();`;

    return emitterAsString;

  }

  private padStringWithSpaces(stringToModify: string, numberOfSpaces: number) {

    const paddedString: string = `${'\xa0'.repeat(numberOfSpaces)}${stringToModify}`;

    return paddedString;
  }

}
