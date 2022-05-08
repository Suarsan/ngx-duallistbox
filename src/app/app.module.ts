import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDuallistboxModule } from 'projects/suarsan/ngx-duallistbox/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxDuallistboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
