import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContainerModel } from 'src/app/models/container.model';
import { PresenterModel, PropertyModel, EventEmitterModel } from 'src/app/models/component.model';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-container-display',
  templateUrl: './container-display.component.html',
  styleUrls: ['./container-display.component.css']
})
export class ContainerDisplayComponent implements OnInit {

  @Input() container: ContainerModel;

  @Output() generateContainerCode: EventEmitter<ContainerModel> = new EventEmitter<ContainerModel>();

  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  constructor() { }

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

  }

  removeEventEmitterClicked(presenter: PresenterModel, event: EventEmitterModel): void {

    presenter.eventEmitters = presenter.eventEmitters.filter(ev => ev.id !== event.id);

  }

  generateContainerCodeClicked(container: ContainerModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file?
    this.generateContainerCode.emit(container);

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

}
