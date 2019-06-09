import { CreateComponentModalComponent } from './modals/create-component-modal/create-component-modal.component';
import { ComponentCreationService } from './providers/component-creation.service';
import { ComponentModel, SupportedTypescriptTypes } from './models/component.model';
import { Component } from '@angular/core';
import { ApplicationSettings } from './models/application-settings.model';
import { ContainerCreationService } from './providers/container-creation.service';
import { ContainerModel } from './models/container.model';
import { ComponentCode } from './models/component-code.model';
import { ModuleCode } from './models/module-code.model';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateContainerModalComponent } from './modals/create-container-modal/create-container-modal.component';
import { EditContainerModalComponent } from './modals/edit-container-modal/edit-container-modal.component';
import { cloneDeep } from 'lodash';
import { EditComponentModalComponent } from './modals/edit-component-modal/edit-component-modal.component';
import interact from 'interactjs';

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

  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  constructor(
    private componentCreationService: ComponentCreationService,
    private containerCreationService: ContainerCreationService,
    private modalService: NgbModal
  ) { }

  // interact('.draggable').draggable({

  // });

  createContainer(): void {

    const modalRef: NgbModalRef = this.modalService.open(CreateContainerModalComponent, { ...this.modalOptions, size: 'sm' });

    modalRef.result.then(result => {
      if (result) {
        this.containers = [...this.containers, result];
      }
    });
  }

  createComponent(): void {

    const modalRef: NgbModalRef = this.modalService.open(CreateComponentModalComponent, this.modalOptions);

    const containerListRef: Array<ContainerModel> = cloneDeep(this.containers);
    modalRef.componentInstance.containers = containerListRef;

    modalRef.result.then(result => {
      if (result) {
        const parentContainer: ContainerModel = this.containers.find(container => container.id === result.parentContainer.id);

        if (parentContainer) {
          parentContainer.components = [...parentContainer.components, result];

          this.components = [...this.components, result];
        } else {
          // Error when linking component to parent container
        }
      }
    });
  }

  editContainer(container: ContainerModel): void {

    const modalRef: NgbModalRef = this.modalService.open(EditContainerModalComponent, { ...this.modalOptions, size: 'sm' });

    const containerRef: ContainerModel = cloneDeep(container);
    modalRef.componentInstance.containerModel = containerRef;

    modalRef.result.then(result => {
      if (result) {
        this.containers = [...this.containers.filter(items => items.id !== result.id), result];
      }
    });
  }

  editComponent(component: ContainerModel): void {

    const modalRef: NgbModalRef = this.modalService.open(EditComponentModalComponent, this.modalOptions);

    const componentRef: ContainerModel = cloneDeep(component);
    const containerListRef: Array<ContainerModel> = cloneDeep(this.containers);

    modalRef.componentInstance.componentModel = componentRef;
    modalRef.componentInstance.containers = containerListRef;

    modalRef.result.then(result => {
      if (result) {
        this.components = [...this.components.filter(items => items.id !== result.id), result];
      }
    });
  }

  getContainerCode(container: ContainerModel): void {

    const containerCode: ComponentCode = this.containerCreationService.createContainerCode(container, this.userSettings);

    console.log(containerCode);
  }

  getComponentCode(component: ComponentModel): void {

    const componentCode: ComponentCode = this.componentCreationService.createComponentCode(component, this.userSettings);

    console.log(componentCode);
  }

  generateModuleCode(): void {

    const componentCode: Array<ComponentCode> = this.components.map(component => this.componentCreationService.createComponentCode(component, this.userSettings));
    const containerCode: Array<ComponentCode> = this.containers.map(container => this.containerCreationService.createContainerCode(container, this.userSettings));

    const moduleCode: ModuleCode = {
      containers: containerCode,
      components: componentCode
    };

    console.log(moduleCode);
  }

}
