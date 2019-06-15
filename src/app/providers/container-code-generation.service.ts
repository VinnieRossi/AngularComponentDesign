import { ComponentCode } from '../models/component-code.model';
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '../models/application-settings.model';
import { ContainerModel } from '../models/container.model';
import { ContainerToTsService } from './container-to-ts.service';
import { ContainerToHtmlService } from './container-to-html.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerCodeGenerationService {

  constructor(
    private containerToTsService: ContainerToTsService,
    private containerToHtmlService: ContainerToHtmlService
  ) { }

  generateCodeForContainer(container: ContainerModel, appSettings: ApplicationSettings): ComponentCode {

    // TODO: Make the app settings reachable from shared locations
    const typescriptAsString: string = this.containerToTsService.generateTypescriptForContainer(container, appSettings);
    const htmlAsString: string = this.containerToHtmlService.generateHtmlForContainer(container, appSettings);

    console.log(`Typescript for container was: \n${typescriptAsString}`);
    console.log(`Html for container was: \n${htmlAsString}`);

    const containerCode: ComponentCode = {
      ts: typescriptAsString,
      html: htmlAsString,
      css: ''
    };

    return containerCode;
  }
}
