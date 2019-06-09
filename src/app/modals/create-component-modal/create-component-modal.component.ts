import { ComponentModel, PropertyModel, SupportedTypescriptTypes, EventEmitterModel } from './../../models/component.model';
import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
const uuidv1 = require('uuid/v1');

@Component({
  selector: 'app-create-component-modal',
  templateUrl: './create-component-modal.component.html',
  styleUrls: ['./create-component-modal.component.css']
})
export class CreateComponentModalComponent implements OnInit {

  // So we can put type options in the dropdown
  supportedTypes = Object.values(SupportedTypescriptTypes);

  componentModel: ComponentModel = {
    id: uuidv1(),
    name: '',
    inputProperties: [],
    eventEmitters: []
  };

  newInput: PropertyModel = {
    name: '',
    type: SupportedTypescriptTypes.String
  };

  newEmitter: EventEmitterModel = {
    name: '',
    type: SupportedTypescriptTypes.String
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  setSelectedPropertyType(event: SupportedTypescriptTypes): void {
    this.newInput.type = event;
  }

  setSelectedEmitterType(event: SupportedTypescriptTypes): void {
    this.newEmitter.type = event;
  }

  createInputProperty(): void {

    if (!(this.newInput.name && this.newInput.type)) { return; }

    this.componentModel.inputProperties = [...this.componentModel.inputProperties, this.newInput];

    this.newInput = {
      name: '',
      type: SupportedTypescriptTypes.String
    };
  }

  createEventEmitter(): void {

    if (!(this.newEmitter.name && this.newEmitter.type)) { return; }

    this.componentModel.eventEmitters = [...this.componentModel.eventEmitters, this.newEmitter];

    this.newEmitter = {
      name: '',
      type: SupportedTypescriptTypes.String
    };
  }

  handleCloseModal(): void {
    this.activeModal.close();
  }

  handleCreateComponent(): void {

    const modelCopy: ComponentModel = cloneDeep(this.componentModel);

    this.activeModal.close(modelCopy);
  }

}
