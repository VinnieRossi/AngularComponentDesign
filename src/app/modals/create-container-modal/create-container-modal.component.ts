import { ContainerModel } from '../../models/container.model';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';
const uuidv1 = require('uuid/v1');


@Component({
  selector: 'app-create-container-modal',
  templateUrl: './create-container-modal.component.html',
  styleUrls: ['./create-container-modal.component.css']
})
export class CreateContainerModalComponent implements OnInit {

  containerModel: ContainerModel = {
    id: uuidv1(),
    name: '',
    components: []
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  handleCloseModal(): void {
    this.activeModal.close();
  }

  handleCreateContainer(): void {

    const modelCopy: ContainerModel = cloneDeep(this.containerModel);

    this.activeModal.close(modelCopy);
  }

}
