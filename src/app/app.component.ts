import { Component } from '@angular/core';
import { ApplicationSettings } from './models/application-settings.model';
import { ContainerModel } from './models/container.model';
import { ComponentCode } from './models/component-code.model';
import { ModuleCode } from './models/module-code.model';
import { ContainerCodeGenerationService } from './providers/container-code-generation.service';


const uuidv1 = require('uuid/v1');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  containers: Array<ContainerModel> = [];

  userSettings: ApplicationSettings = {
    applicationPrefix: 'app',
    indentAmount: 2,
    applicationStyling: 'css'
  };

  constructor(
    private containerCodeGenerationService: ContainerCodeGenerationService
  ) { }

  createContainer(): void {

    const newContainer: ContainerModel = {
      id: uuidv1(),
      name: `HelloWorldContainer${this.containers.length + 1}`,
      components: []
    };

    this.containers = [...this.containers, newContainer];
  }

  generateModuleCode(): void {

    const containerCode: Array<ComponentCode> = this.containers.map(container => this.containerCodeGenerationService.generateCodeForContainer(container, this.userSettings));

    const moduleCode: ModuleCode = {
      containers: containerCode
      // components: componentCode
    };

    console.log(moduleCode);
  }

}
