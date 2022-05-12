# NgxDuallistbox

[![npm version](https://badge.fury.io/js/@suarsan%2Fngx-duallistbox.svg)](https://badge.fury.io/js/@suarsan%2Fngx-duallistbox)

A full featured and customizable dual list box selector for Angular.

![alt text](https://github.com/Suarsan/ngx-duallistbox/raw/master/projects/suarsan/ngx-duallistbox/demo.png)


## Demo

Try full demo  at **[ngx-duallistbox](www.javiersuarezsanchez.com/projects/ngx-duallistbox)**

## Usage

#### Installation

Install via npm

    npm install @suarsan/duallistbox
    
#### Usage

Import ``NgxDuallistboxModule`` in your app.module.ts

    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { AppComponent } from './app.component';
    
    import { NgxDuallistboxModule } from 'projects/suarsan/ngx-duallistbox/src/public-api';

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

## Documentation

#### Inputs

| Input | Type | Default | Required | Description |
| ----- | ---- | ------  | -------- | ----------- |
| title | `string\|undefined` | - | false | Show title |
| inData | `Array<Object>` | - | true |  Set available data list |
| outData | `Array<Object>` | - | true |  Set selected data list |
| inputId | `string` | 'id' | false | Select available data items id attribute |
| outputId | `string` | 'id' | false | Select selected data items id attribute |
| display | `Array<string>` | - | true | Select item attributes to show |
| displaySeparator | `string` | ' - ' | false | Select separator between  item attributes. |
| showFilterInput | `boolean` | false | false | Show filter at available data list |
| showFilterOutput | `boolean` | false | false | Show filter at selected data list |
| filterInputKeys | `Array<string>` | -  | false | Select item attributes to filter at available data list |
| filterOutputKeys | `Array<string>` | -  | false | Select item attributes to filter at selected data list |

#### Example

    <ngx-duallistbox
        [title]="'@suarsan/duallistbox'"
        [inData]="inData" 
        [outData]="outData" 
        [inputId]="'identifier'" 
        [outputId]="'identifier" 
        [display]="['name', 'age']"
        [displaySeparator]="' · '"
        [showFilterInput]="true" 
        [showFilterOutput]="true" 
        [filterInputKeys]="['name']" 
        [filterOutputKeys]="['name']"
    ></ngx-duallistbox>


---

## Creator

**[Javier Suárez Sánchez](https://javiersuarezsanchez.com)**




---

### Keywords

`angular` `ngx` `javascript` `duallistbox` `dual` `list` `box` `rich` `customizable`

---



