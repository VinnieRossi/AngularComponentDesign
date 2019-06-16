import { Component, OnInit, Input } from '@angular/core';
import { ContainerModel } from 'src/app/models/container.model';
import { ApplicationSettings } from 'src/app/models/application-settings.model';
import { PresenterModel } from 'src/app/models/component.model';
import { ComponentCreationService } from 'src/app/providers/component-creation.service';
import { ContainerCodeGenerationService } from 'src/app/providers/container-code-generation.service';
import { ComponentCode } from 'src/app/models/component-code.model';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'vin-container-tab',
  templateUrl: './container-tab.component.html',
  styleUrls: ['./container-tab.component.css']
})
export class ContainerTabComponent implements OnInit {

  @Input() userSettings: ApplicationSettings;
  @Input() containers: ContainerModel;

  selectedContainer: ContainerModel;

  constructor(
    private componentCreationService: ComponentCreationService,
    private containerCodeGenerationService: ContainerCodeGenerationService
  ) { }

  ngOnInit() {
    // We are safe to assume there will always be at least one container because this component is wrapped in an ngIf
    this.selectedContainer = this.containers[0];
  }

  containerTabSelected(container: ContainerModel): void {

    this.selectedContainer = container;
  }


  generateContainerCode(container: ContainerModel): void {
    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file?
    const containerCode: ComponentCode = this.containerCodeGenerationService.generateCodeForContainer(container, this.userSettings);

    console.log(containerCode);
  }

  generatePresenterCode(component: PresenterModel): void {
    // Pull up modal with 2* tabs, each tab is file type and has button to either copy code to clipboard or download file
    const componentCode: ComponentCode = this.componentCreationService.createComponentCode(component, this.userSettings);

    console.log(componentCode);
  }

}
