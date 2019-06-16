import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EventEmitterModel, SupportedTypescriptTypes } from 'src/app/models/component.model';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-add-event-emitter',
  templateUrl: './add-event-emitter.component.html',
  styleUrls: ['./add-event-emitter.component.css']
})
export class AddEventEmitterComponent implements OnInit {

  @Input() disabled: boolean = false;

  @Output() currentlyCreatingEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() createNewEventEmitter: EventEmitter<EventEmitterModel> = new EventEmitter<EventEmitterModel>();

  isCreatingEvent: boolean = false;

  supportedTypes = Object.values(SupportedTypescriptTypes);

  newEventEmitter: EventEmitterModel = {
    id: uuidv1(),
    name: '',
    type: SupportedTypescriptTypes.String
  };

  constructor() { }

  ngOnInit() {
  }

  showCreateEventEmitterClicked(): void {

    this.isCreatingEvent = true;

    this.currentlyCreatingEventEmitter.emit(this.isCreatingEvent);

    this.resetNewEventEmitter();

  }

  resetNewEventEmitter(): void {

    this.newEventEmitter = {
      id: uuidv1(),
      name: '',
      type: SupportedTypescriptTypes.String
    };
  }

  setEmitterType(type: SupportedTypescriptTypes): void {

    this.newEventEmitter.type = type;
  }

  createEventEmitterClicked(): void {

    this.createNewEventEmitter.emit(this.newEventEmitter);

    this.closeEventEmitter();

  }

  closeEventEmitter(): void {

    this.isCreatingEvent = false;

    this.currentlyCreatingEventEmitter.emit(this.isCreatingEvent);
  }

}
