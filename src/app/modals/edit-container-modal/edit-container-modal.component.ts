import { Component, OnInit } from '@angular/core';
import { ContainerModel } from '../../models/container.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-container-modal',
  templateUrl: './edit-container-modal.component.html',
  styleUrls: ['./edit-container-modal.component.css']
})
export class EditContainerModalComponent implements OnInit {

  containerModel: ContainerModel;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  handleCloseModal(): void {
    this.activeModal.close();
  }

  handleUpdateContainer(): void {
    this.activeModal.close(this.containerModel);
  }

}