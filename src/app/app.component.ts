import { ComponentCreationService } from './providers/component-creation.service';
import { ComponentModel, SupportedTypescriptTypes } from './models/component.model';
import { Component } from '@angular/core';
import { ApplicationSettings } from './models/application-settings.model';
import { ContainerCreationService } from './providers/container-creation.service';
import { ContainerModel } from './models/container.model';
import { ComponentCode } from './models/component-code.model';
import { ModuleCode } from './models/module-code.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateContainerModalComponent } from './create-container-modal/create-container-modal.component';
import { EditContainerModalComponent } from './edit-container-modal/edit-container-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userSettings: ApplicationSettings = {
    applicationPrefix: 'app',
    indentAmount: 2,
    applicationStyling: 'css'
  };

  containers: Array<ContainerModel> = [];
  components: Array<ComponentModel> = [];

  constructor(
    private componentCreationService: ComponentCreationService,
    private containerCreationService: ContainerCreationService,
    private modalService: NgbModal
  ) { }

  createContainer(): void {

    const modalRef: NgbModalRef = this.modalService.open(CreateContainerModalComponent);

    modalRef.result.then(result => {
      if (result) {
        this.containers.push(result);
      }
    });
  }

  createComponent(): void {

    const newComponent: ComponentModel = {
      name: 'b',
      inputProperties: [],
      eventEmitters: []
    };

    this.components.push(newComponent);
  }

  editContainer(container: ContainerModel): void {

    const modalRef: NgbModalRef = this.modalService.open(EditContainerModalComponent);
    modalRef.componentInstance.containerModel = container;

    modalRef.result.then(result => {
      if (result) {
        this.containers = [...this.containers.filter(items => items.id !== result.id), result];
      }
    });
  }

  generateModuleCode(): void {

    const component1: ComponentModel = {
      name: 'HelloWorld',
      inputProperties: [
        //TODO: Have option to generate input with separate name (eg @Input('account-id') id: string;)
        {
          name: 'bankName',
          type: SupportedTypescriptTypes.String
        },
        {
          name: 'accountName',
          type: SupportedTypescriptTypes.String
        }
      ],
      eventEmitters: [
        {
          name: 'close',
          type: SupportedTypescriptTypes.Any
        },
        {
          name: 'edit',
          type: SupportedTypescriptTypes.Any
        }
      ]
    };

    const component2: ComponentModel = {
      name: 'GoodbyeWorld',
      inputProperties: [
        //TODO: Have option to generate input with separate name (eg @Input('account-id') id: string;)
        {
          name: 'charName',
          type: SupportedTypescriptTypes.String
        },
        {
          name: 'barName',
          type: SupportedTypescriptTypes.String
        }
      ],
      eventEmitters: [
        {
          name: 'banana',
          type: SupportedTypescriptTypes.Any
        },
        {
          name: 'apple',
          type: SupportedTypescriptTypes.Any
        }
      ]
    };

    const allComponents: Array<ComponentModel> = [component1, component2];

    const container1: ContainerModel = {
      id: '1',
      name: 'HelloWorldContainer',
      components: allComponents
    };

    const allContainers: Array<ContainerModel> = [container1];

    const componentCode: Array<ComponentCode> = allComponents.map(component => this.componentCreationService.createComponentCode(component, this.userSettings));
    const containerCode: Array<ComponentCode> = allContainers.map(container => this.containerCreationService.createContainerCode(container, this.userSettings));

    const moduleCode: ModuleCode = {
      containers: containerCode,
      components: componentCode
    };

    console.log(moduleCode);
  }
}
