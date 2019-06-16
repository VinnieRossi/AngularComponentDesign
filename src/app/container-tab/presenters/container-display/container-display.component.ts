import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContainerModel } from 'src/app/models/container.model';
import { PresenterModel, PropertyModel, EventEmitterModel, SupportedTypescriptTypes } from 'src/app/models/component.model';
import { ComponentCode } from 'src/app/models/component-code.model';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentCreationService } from 'src/app/providers/component-creation.service';
import { ContainerCodeGenerationService } from 'src/app/providers/container-code-generation.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicationSettings } from 'src/app/models/application-settings.model';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-container-display',
  templateUrl: './container-display.component.html',
  styleUrls: ['./container-display.component.css']
})
export class ContainerDisplayComponent implements OnInit {

  @Input() container: ContainerModel;

  @Output() generateContainerCode: EventEmitter<ContainerModel> = new EventEmitter<ContainerModel>();
  @Output() generatePresenterCode: EventEmitter<PresenterModel> = new EventEmitter<PresenterModel>();


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
    private containerCodeGenerationService: ContainerCodeGenerationService
  ) { }

  ngOnInit() { }

  removeInputClicked(presenter: PresenterModel, prop: PropertyModel): void {

    presenter.inputProperties = presenter.inputProperties.filter(ip => ip.id !== prop.id);

  }

  createPresenterClicked(container: ContainerModel): void {

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



  removeEventEmitterClicked(presenter: PresenterModel, event: EventEmitterModel): void {

    presenter.eventEmitters = presenter.eventEmitters.filter(ev => ev.id !== event.id);

  }

  generateContainerCodeClicked(container: ContainerModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file?
    this.generateContainerCode.emit(container);

  }



  enablePresenterNameChange(): void {
    this.isEditingPresenterName = true;
  }



  savePresenterNameClicked(): void {
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


  showCreateInputPropertyClicked(): void {

    this.isCreatingInput = true;

  }

  showCreateEventEmitterClicked(): void {
    this.isCreatingEvent = true;
  }

  createInputPropertyClicked(presenter: PresenterModel): void {

    presenter.inputProperties = [...presenter.inputProperties, this.newInputProperty];

    this.newInputProperty = {
      id: uuidv1(),
      name: '',
      type: SupportedTypescriptTypes.String
    };

    this.isCreatingInput = false;

  }

  createEventEmitterClicked(presenter: PresenterModel): void {

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


  generatePresenterCodeClicked(component: PresenterModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file
    this.generatePresenterCode.emit(component);
  }


}
