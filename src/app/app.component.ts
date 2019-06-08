import { ComponentCreationService } from './providers/component-creation.service';
import { ComponentModel, SupportedTypescriptTypes } from './models/component.model';
import { Component } from '@angular/core';
import { ApplicationSettings } from './models/application-settings.model';
import { ContainerCreationService } from './providers/container-creation.service';
import { ContainerModel } from './models/container.model';
import { ComponentCode } from './models/component-code.model';
import { ModuleCode } from './models/module-code.model';

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

    const component1: ComponentModel = {
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
          emitterName: 'banana',
          emitterPropertyType: SupportedTypescriptTypes.Any
        },
        {
          emitterName: 'apple',
          emitterPropertyType: SupportedTypescriptTypes.Any
        }
      ]
    };

    const allComponents: Array<ComponentModel> = [component1, component2];

    const container1: ContainerModel = {
      containerName: 'HelloWorldContainer',
      components: allComponents
    };

    const allContainers: Array<ContainerModel> = [container1];

    const componentCode: Array<ComponentCode> = allComponents.map(component => this.componentCreationService.createComponentCode(component, defaultApplicationSettings));
    const containerCode: Array<ComponentCode> = allContainers.map(container => this.containerCreationService.createContainerCode(container, defaultApplicationSettings));

    const moduleCode: ModuleCode = {
      containers: [containerCode],
      components: [componentCode]
    };

    console.log(moduleCode);

  }
}
