import { Component, OnInit } from '@angular/core';
import { SupportedTypescriptTypes, ComponentModel } from 'src/app/models/component.model';
import { ContainerModel } from 'src/app/models/container.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-component-modal',
  templateUrl: './edit-component-modal.component.html',
  styleUrls: ['./edit-component-modal.component.css']
})
export class EditComponentModalComponent implements OnInit {

  // So we can put type options in the dropdown
  supportedTypes = Object.values(SupportedTypescriptTypes);

  // Being fed in from the modal parent
  containers: Array<ContainerModel> = [];
  componentModel: ComponentModel;

  selectedContainer: ContainerModel;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.componentModel);
  }

  updateSelectedPropertyType(): void { }

  updateInputProperty(): void { }

  updateEventEmitter(): void { }

  updateSelectedEmitterType(): void { }

  updateParentContainer(): void { }

  handleUpdateComponent(): void { }

  handleCloseModal(): void {
    this.activeModal.close();
  }

}
