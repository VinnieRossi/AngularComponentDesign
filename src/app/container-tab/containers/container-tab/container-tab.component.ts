import { Component, OnInit, Input } from '@angular/core';
import { ContainerModel } from 'src/app/models/container.model';
import { ApplicationSettings } from 'src/app/models/application-settings.model';
import { SupportedTypescriptTypes, PropertyModel, EventEmitterModel, PresenterModel } from 'src/app/models/component.model';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentCreationService } from 'src/app/providers/component-creation.service';
import { ContainerCodeGenerationService } from 'src/app/providers/container-code-generation.service';
import { ToastrService } from 'ngx-toastr';
import { ComponentCode } from 'src/app/models/component-code.model';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-container-tab',
  templateUrl: './container-tab.component.html',
  styleUrls: ['./container-tab.component.css']
})
export class ContainerTabComponent implements OnInit {

  @Input() userSettings: ApplicationSettings;
  @Input() containers: ContainerModel;

  selectedContainer: ContainerModel;

  // So we can put type options in the dropdown
  supportedTypes = Object.values(SupportedTypescriptTypes);

  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  isCreatingInput: boolean = false;
  isCreatingEvent: boolean = false;
  isEditingPresenterName: boolean = false;

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
    private containerCodeGenerationService: ContainerCodeGenerationService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.selectedContainer = this.containers[0];
  }

  containerTabSelected(container: ContainerModel): void {
    this.selectedContainer = container;
  }

  removeInputPropertyFromPresenter(presenter: PresenterModel, prop: PropertyModel): void {

    presenter.inputProperties = presenter.inputProperties.filter(ip => ip.id !== prop.id);

  }


  removeEventEmitterFromPresenter(presenter: PresenterModel, event: EventEmitterModel): void {

    presenter.eventEmitters = presenter.eventEmitters.filter(ev => ev.id !== event.id);

  }

  generateContainerCode(container: ContainerModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file?

    const containerCode: ComponentCode = this.containerCodeGenerationService.generateCodeForContainer(container, this.userSettings);

    console.log(containerCode);
  }

  createPresenter(container: ContainerModel): void {

    const tempComponent: PresenterModel = {
      id: uuidv1(),
      name: `HelloWorld${container.components.length + 1}`,
      inputProperties: [],
      eventEmitters: [],
      parentContainer: container
    };

    container.components = [...container.components, tempComponent];

    // this.components = [...this.components, tempComponent];

  }


  enablePresenterNameChange(): void {
    this.isEditingPresenterName = true;
  }



  disablePresenterNameChange(): void {
    this.isEditingPresenterName = false;
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


  showCreateInputProperty(): void {

    this.isCreatingInput = true;

  }

  showCreateEventEmitter(): void {
    this.isCreatingEvent = true;
  }

  createInputPropertyForPresenter(presenter: PresenterModel): void {

    presenter.inputProperties = [...presenter.inputProperties, this.newInputProperty];

    this.newInputProperty = {
      id: uuidv1(),
      name: '',
      type: SupportedTypescriptTypes.String
    };

    this.isCreatingInput = false;

  }

  createEventEmitterForPresenter(presenter: PresenterModel): void {

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


  generatePresenterCode(component: PresenterModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file

    const componentCode: ComponentCode = this.componentCreationService.createComponentCode(component, this.userSettings);

    console.log(componentCode);
  }

}
