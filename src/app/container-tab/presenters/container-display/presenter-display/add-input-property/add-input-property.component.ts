import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PropertyModel, SupportedTypescriptTypes } from 'src/app/models/component.model';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-add-input-property',
  templateUrl: './add-input-property.component.html',
  styleUrls: ['./add-input-property.component.css']
})
export class AddInputPropertyComponent implements OnInit {

  @Input() disabled: boolean = false;

  @Output() currentlyCreatingInputProperty: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() createNewInputProperty: EventEmitter<PropertyModel> = new EventEmitter<PropertyModel>();

  isCreatingInput: boolean = false;

  supportedTypes = Object.values(SupportedTypescriptTypes);

  newInputProperty: PropertyModel = {
    id: uuidv1(),
    name: '',
    type: SupportedTypescriptTypes.String
  };

  constructor() { }

  ngOnInit() {
  }

  showCreateInputPropertyClicked(): void {

    this.isCreatingInput = true;

    this.currentlyCreatingInputProperty.emit(this.isCreatingInput);

    this.resetNewInputProperty();

  }

  resetNewInputProperty(): void {

    this.newInputProperty = {
      id: uuidv1(),
      name: '',
      type: SupportedTypescriptTypes.String
    };
  }

  setPropertyType(type: SupportedTypescriptTypes): void {

    this.newInputProperty.type = type;
  }

  createInputPropertyClicked(): void {

    this.createNewInputProperty.emit(this.newInputProperty);

    this.closeInputProperty();

  }

  closeInputProperty(): void {

    this.isCreatingInput = false;

    this.currentlyCreatingInputProperty.emit(this.isCreatingInput);
  }

}
