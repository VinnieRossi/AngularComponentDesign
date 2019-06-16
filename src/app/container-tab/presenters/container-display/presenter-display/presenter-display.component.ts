import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PresenterModel, PropertyModel, SupportedTypescriptTypes, EventEmitterModel } from 'src/app/models/component.model';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-presenter-display',
  templateUrl: './presenter-display.component.html',
  styleUrls: ['./presenter-display.component.css']
})

export class PresenterDisplayComponent implements OnInit {

  @Input() presenter: PresenterModel;

  @Output() generatePresenterCode: EventEmitter<PresenterModel> = new EventEmitter<PresenterModel>();

  isCreatingInput: boolean = false;
  isCreatingEvent: boolean = false;
  isEditingPresenterName: boolean = false;

  supportedTypes = Object.values(SupportedTypescriptTypes);

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


  constructor() { }

  ngOnInit() {
  }

  enablePresenterNameChange(): void {
    this.isEditingPresenterName = true;
  }

  savePresenterNameClicked(): void {
    this.isEditingPresenterName = false;
  }

  showCreateInputPropertyClicked(): void {
    this.isCreatingInput = true;
  }

  setPropertyType(type: SupportedTypescriptTypes): void {

    this.newInputProperty.type = type;
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

  removeInputClicked(presenter: PresenterModel, prop: PropertyModel): void {

    presenter.inputProperties = presenter.inputProperties.filter(ip => ip.id !== prop.id);

  }

  showCreateEventEmitterClicked(): void {
    this.isCreatingEvent = true;
  }

  setEmitterType(type: SupportedTypescriptTypes): void {

    this.newEventEmitter.type = type;
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

  removeEventEmitterClicked(presenter: PresenterModel, event: EventEmitterModel): void {

    presenter.eventEmitters = presenter.eventEmitters.filter(ev => ev.id !== event.id);

  }


  generatePresenterCodeClicked(component: PresenterModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file
    this.generatePresenterCode.emit(component);
  }


}
