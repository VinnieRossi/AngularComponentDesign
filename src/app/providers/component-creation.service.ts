import { ApplicationSettings } from '../models/application-settings.model';
import { Injectable } from '@angular/core';
import { PresenterModel } from '../models/component.model';
import { ComponentToTsService } from './component-to-ts.service';
import { ComponentToHtmlService } from './component-to-html.service';
import { ComponentCode } from '../models/component-code.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentCreationService {

  constructor(
    private componentToTsService: ComponentToTsService,
    private componentToHtmlService: ComponentToHtmlService
  ) { }

  createComponentCode(component: PresenterModel, appSettings: ApplicationSettings): ComponentCode {

    // TODO: Make the app settings reachable from shared locations 
    const typescriptAsString: string = this.componentToTsService.generateTypescriptForComponent(component, appSettings);
    const htmlAsString: string = this.componentToHtmlService.generateHtmlForComponent(component, appSettings);

    console.log(`Typescript for component was: \n${typescriptAsString}`);
    console.log(`Html for component was: \n${htmlAsString}`);

    const componentCode: ComponentCode = {
      ts: typescriptAsString,
      html: htmlAsString,
      css: ''
    };

    return componentCode;
  }

}
