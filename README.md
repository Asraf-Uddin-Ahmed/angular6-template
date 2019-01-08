# Angular6Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Install packages (`npm i package_name`)
@angular/cdk, @angular/flex-layout, @angular/material, @ng-bootstrap/ng-bootstrap, @ng-dynamic-forms/core, @ng-dynamic-forms/ui-bootstrap, @ng-dynamic-forms/ui-ng-bootstrap, angular-font-awesome, angular2-text-mask, bootstrap, font-awesome, hammerjs, jquery, ng2-file-upload

## After installation
* Remove `import { Observable } from 'rxjs/Observable';` from *home.component.ts*
* Remove `NgbAlertModule` from *shared-components.module.ts* and resolve dependencies

## Running on http-server
* Install http-server: `npm install -g http-server`
* Run http-server: `http-server <project_path_of_index_file>`

## Run http-server with forever (EC2 instance)
To keep the app running continuously without being affected by logging out of EC2 instance. We use the node package forever.js. First ctrl+c to stop the existing app running.
* Install the package: `sudo npm install forever -g`
* And then start the app by: `forever start <path_of_http-server> <project_path_of_index_file> -p 8000 -d false`, e.g. `forever start /usr/bin/http-server ~/app -p 8000 -d false`
* To see running forever apps: `forever list`
* To stop the app: `forever stop <forever_id>`, e.g. `forever stop 12305`
