import { ComponentCreationService } from './providers/component-creation.service';
import { ComponentModel, PropertyModel, SupportedTypescriptTypes, EventEmitterModel } from './models/component.model';
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
import { ToastrService } from 'ngx-toastr';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // So we can put type options in the dropdown
  supportedTypes = Object.values(SupportedTypescriptTypes);

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

  isCreatingInput: boolean = false;
  isCreatingEvent: boolean = false;

  newInputProperty: PropertyModel = {
    id: uuidv1(),
    name: '',
    type: SupportedTypescriptTypes.String
  };

  newEventEmitter: EventEmitterModel = {
    id: uuidv1(),
    name: '',
    type: SupportedTypescriptTypes.String
  };

  constructor(
    private componentCreationService: ComponentCreationService,
    private containerCreationService: ContainerCreationService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  createContainer(): void {

    const modalRef: NgbModalRef = this.modalService.open(CreateContainerModalComponent, { ...this.modalOptions, size: 'sm' });

    modalRef.result.then(result => {
      if (result) {
        this.containers = [...this.containers, result];
        this.toastr.success('Container added successfully', 'Success');
      }
    });
  }

  showCreateInputProperty(): void {

    this.isCreatingInput = true;

  }

  showCreateEventEmitter(): void {
    this.isCreatingEvent = true;
  }

  createInputPropertyForPresenter(presenter: ComponentModel): void {

    presenter.inputProperties = [...presenter.inputProperties, this.newInputProperty];

    this.newInputProperty = {
      id: uuidv1(),
      name: '',
      type: SupportedTypescriptTypes.String
    };

    this.isCreatingInput = false;

  }

  createEventEmitterForPresenter(presenter: ComponentModel): void {

    presenter.eventEmitters = [...presenter.eventEmitters, this.newEventEmitter];

    this.newEventEmitter = {
      id: uuidv1(),
      name: '',
      type: SupportedTypescriptTypes.String
    };

    this.isCreatingEvent = false;

  }

  setPropertyType(type: SupportedTypescriptTypes): void {

    this.newInputProperty.type = type;
  }

  setEmitterType(type: SupportedTypescriptTypes): void {

    this.newEventEmitter.type = type;
  }

  removeInputPropertyFromPresenter(presenter: ComponentModel, prop: PropertyModel): void {

    presenter.inputProperties = presenter.inputProperties.filter(ip => ip.id !== prop.id);

  }

  removeEventEmitterFromPresenter(presenter: ComponentModel, event: EventEmitterModel): void {

    presenter.eventEmitters = presenter.eventEmitters.filter(ev => ev.id !== event.id);

  }

  createPresenter(container: ContainerModel): void {

    const tempComponent: ComponentModel = {
      id: uuidv1(),
      name: `hello-world-${container.components.length + 1}`,
      inputProperties: [],
      eventEmitters: [],
      parentContainer: container
    };

    container.components = [...container.components, tempComponent];

    this.components = [...this.components, tempComponent];

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

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file?

    const containerCode: ComponentCode = this.containerCreationService.createContainerCode(container, this.userSettings);

    console.log(containerCode);
  }

  getPresenterCode(component: ComponentModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file

    const componentCode: ComponentCode = this.componentCreationService.createComponentCode(component, this.userSettings);

    console.log(componentCode);
  }

  getClassForPresenter(presenterIndex: number): any {

    const classArray: Array<string> = ['presenter-grid-box', 'text-primary'];

    switch (presenterIndex) {
      case 0: {
        classArray.push('first-presenter');
        break;
      }
      case 1: {
        classArray.push('second-presenter');
        break;
      }
      case 2: {
        classArray.push('third-presenter');
        break;
      }
      case 3: {
        classArray.push('fourth-presenter');
        break;
      }
      case 4: {
        classArray.push('fifth-presenter');
        break;
      }
      case 5: {
        classArray.push('sixth-presenter');
        break;
      }
      case 6: {
        classArray.push('seventh-presenter');
        break;
      }
      case 7: {
        classArray.push('eighth-presenter');
        break;
      }
    }

    return classArray;
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
