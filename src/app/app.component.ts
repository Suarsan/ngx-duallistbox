import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  inData = [{
    internalId: '1',
      name: 'Name 1',
      age: '18'
    },
    {
      internalId: '2',
      name: 'Name 2',
      age: '19'
    },
    {
      internalId: '3',
      name: 'Name 3',
      age: '20'
    },
    {
      internalId: '4',
      name: 'Name 4',
      age: '21'
    }];
  outData = [];
  
}
