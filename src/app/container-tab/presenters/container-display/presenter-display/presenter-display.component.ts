import { Component, OnInit, Input, EventEmitter, Output, ApplicationRef, ViewChild } from '@angular/core';
import { PresenterModel, PropertyModel, EventEmitterModel } from 'src/app/models/component.model';
import { AddEventEmitterComponent } from './add-event-emitter/add-event-emitter.component';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-presenter-display',
  templateUrl: './presenter-display.component.html',
  styleUrls: ['./presenter-display.component.css']
})

export class PresenterDisplayComponent implements OnInit {

  @Input() presenter: PresenterModel;

  @Output() generatePresenterCode: EventEmitter<PresenterModel> = new EventEmitter<PresenterModel>();

  @ViewChild(AddEventEmitterComponent) addEventEmitterComponent: AddEventEmitterComponent;

  disableAddEventEmitter: boolean = false;
  disableAddInputProperty: boolean = false;
  isEditingPresenterName: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  enablePresenterNameChange(): void {
    this.isEditingPresenterName = true;
  }

  disableAddEvent(shouldDisable: boolean): void {

    this.disableAddEventEmitter = shouldDisable;
  }

  disableAddInput(shouldDisable: boolean): void {

    this.disableAddInputProperty = shouldDisable;
  }

  createInputProperty(presenter: PresenterModel, newInputProperty: PropertyModel, ): void {

    presenter.inputProperties = [...presenter.inputProperties, newInputProperty];
  }

  createEventEmitter(presenter: PresenterModel, newEventEmitter: EventEmitterModel): void {

    presenter.eventEmitters = [...presenter.eventEmitters, newEventEmitter];
  }

  removeInputClicked(presenter: PresenterModel, prop: PropertyModel): void {

    presenter.inputProperties = presenter.inputProperties.filter(ip => ip.id !== prop.id);

  }

  removeEventEmitterClicked(presenter: PresenterModel, event: EventEmitterModel): void {

    presenter.eventEmitters = presenter.eventEmitters.filter(ev => ev.id !== event.id);

  }

  generatePresenterCodeClicked(component: PresenterModel): void {

    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file
    this.generatePresenterCode.emit(component);
  }

}
