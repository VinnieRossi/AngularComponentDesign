import { ComponentModel, SupportedTypescriptTypes } from './component.model';
import { ComponentToHtmlService } from './component-to-html.service';
import { ComponentToTsService } from './component-to-ts.service';
import { Component } from '@angular/core';
import { ApplicationSettings } from './application-settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularComponentPlanning';

  constructor(
    private componentToTsService: ComponentToTsService,
    private componentToHtmlService: ComponentToHtmlService
  ) {

    // TODO: Ask user for user-defined application settings
    const defaultApplicationSettings: ApplicationSettings = {
      applicationPrefix: 'app',
      indentAmount: 2,
      applicationStyling: 'css'
    };

    const component: ComponentModel = {
      componentName: 'HelloWorld',
      inputProperties: [
        //TODO: Have option to generate input with separate name (eg @Input('account-id') id: string;)
        {
          propertyName: 'bankName',
          propertyType: SupportedTypescriptTypes.String
        },
        {
          propertyName: 'bankName',
          propertyType: SupportedTypescriptTypes.String
        }
      ],
      eventEmitters: [
        {
          emitterName: 'close',
          emitterPropertyType: SupportedTypescriptTypes.Any
        },
        {
          emitterName: 'close',
          emitterPropertyType: SupportedTypescriptTypes.Any
        }
      ]
    };

    // TODO: Make the app settings reachable from shared locations 
    const typescriptAsString: string = this.componentToTsService.generateTypescriptForComponent(component, defaultApplicationSettings);
    const htmlAsString: string = this.componentToHtmlService.generateHtmlForComponent(component, defaultApplicationSettings);

    console.log(`Typescript was: \n${typescriptAsString}`);
    console.log(`Html was: \n${htmlAsString}`);
  }
}
