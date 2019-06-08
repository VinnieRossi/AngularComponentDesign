import { ComponentCreationService } from './component-creation.service';
import { ComponentModel, SupportedTypescriptTypes } from './component.model';
import { ComponentToHtmlService } from './component-to-html.service';
import { ComponentToTsService } from './component-to-ts.service';
import { Component } from '@angular/core';
import { ApplicationSettings } from './application-settings.model';
import { ContainerCreationService } from './container-creation.service';
import { ContainerModel } from './container.model';
import { ComponentCode } from './component-code.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularComponentPlanning';

  constructor(
    private componentCreationService: ComponentCreationService,
    private containerCreationService: ContainerCreationService
  ) {

    // TODO: Ask user for user-defined application settings
    const defaultApplicationSettings: ApplicationSettings = {
      applicationPrefix: 'app',
      indentAmount: 2,
      applicationStyling: 'css'
    };

    const component: ComponentModel = {
      componentName: 'HelloWorld',
      inputProperties: [
        //TODO: Have option to generate input with separate name (eg @Input('account-id') id: string;)
        {
          propertyName: 'bankName',
          propertyType: SupportedTypescriptTypes.String
        },
        {
          propertyName: 'accountName',
          propertyType: SupportedTypescriptTypes.String
        }
      ],
      eventEmitters: [
        {
          emitterName: 'close',
          emitterPropertyType: SupportedTypescriptTypes.Any
        },
        {
          emitterName: 'edit',
          emitterPropertyType: SupportedTypescriptTypes.Any
        }
      ]
    };

    const component2: ComponentModel = {
      componentName: 'GoodbyeWorld',
      inputProperties: [
        //TODO: Have option to generate input with separate name (eg @Input('account-id') id: string;)
        {
          propertyName: 'charName',
          propertyType: SupportedTypescriptTypes.String
        },
        {
          propertyName: 'barName',
          propertyType: SupportedTypescriptTypes.String
        }
      ],
      eventEmitters: [
        {
          emitterName: 'close',
          emitterPropertyType: SupportedTypescriptTypes.Any
        },
        {
          emitterName: 'edit',
          emitterPropertyType: SupportedTypescriptTypes.Any
        }
      ]
    };


    const container: ContainerModel = {
      containerName: 'HelloWorldContainer',
      components: [
        component,
        component2
      ]
    };

    const componentCode: ComponentCode = this.componentCreationService.createComponentCode(component, defaultApplicationSettings);
    const containerCode: ComponentCode = this.containerCreationService.createContainerCode(container, defaultApplicationSettings);

  }
}
