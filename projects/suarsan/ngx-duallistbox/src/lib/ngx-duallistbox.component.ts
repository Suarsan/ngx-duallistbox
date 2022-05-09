import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

export class DualListBoxItem {
  private _data: Object | undefined;
  private _selected: boolean | undefined;
  private _visible: boolean | undefined;

  constructor(data?: Object, selected?: boolean, visible?: boolean) {
    this._data = data;
    this._selected = selected;
    this._visible = visible;
  }
  public get Data() {
    return this._data;
  }
  public get Selected() {
    return this._selected;
  }
  public get Visible() {
    return this._visible;
  }
  public set Data(data) {
    this._data = data;
  }
  public set Selected(selected) {
    this._selected = selected;
  }
  public set Visible(visible) {
    this._visible = visible;
  }
}

@Component({
  selector: 'ngx-duallistbox',
  templateUrl: 'ngx-duallistbox.component.html',
  styleUrls: ['ngx-duallistbox.component.scss']
})
export class NgxDuallistboxComponent implements OnInit, OnChanges {

  private input: Map<any, DualListBoxItem>;
  private output: Map<any, DualListBoxItem>;
  private filterInputKey: string | undefined;
  private filterOutputKey: string | undefined;
  @Output() addEvent = new EventEmitter<any>();
  @Output() removeEvent = new EventEmitter<any>();
  @Output() outputEvent = new EventEmitter<any>();
  @Input() inputId!: string;
  @Input() outputId!: string;
  @Input() title: string | undefined;
  @Input() display!: Array<string>;
  @Input() displaySeparator!: string;
  @Input() showFilterInput: boolean;
  @Input() showFilterOutput: boolean;
  @Input() filterInputKeys!: Array<string>;
  @Input() filterOutputKeys!: Array<string>;
  @Input() inData: Array<Object>;
  @Input() outData: Array<Object>;

  constructor(private cd: ChangeDetectorRef) {
    this.input = new Map<any, DualListBoxItem>();
    this.output = new Map<any, DualListBoxItem>();
    this.inData = [];
    this.outData = [];
    this.showFilterInput = false;
    this.showFilterOutput = false;
    this.inputId = 'id';
    this.outputId = 'id';
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.init();
    this.inDataProcess(this.inData);
    this.outDataProcess(this.outData);
  }

  public inDataProcess(data: any) {
    this.input.clear();
    for (const i of data) {
      this.input.set(eval('i.' + this.inputId), new DualListBoxItem(i, false, true));
    }
    if (data.length === 0) {
      this.input.clear();
      this.output.clear();
    }
  }
  public outDataProcess(data: any) {
    this.output.clear();
    for (const o of data) {
      this.output.set(eval('o.' + this.outputId), new DualListBoxItem(o, false, true));
    }
    if (data.length === 0) {
      this.output.clear();
    }
  }

  // public init() {
  //   if (this.input && this.output) {
  //     for (const o of this.output) {
  //       this.input.delete(o[0]);
  //       this.cd.detectChanges();
  //     }
  //   }
  // }

  public get(map: any) : any[] {
    return Array.from(eval('this.' + map).entries());
  }

  public toggle(map: any, itemkey: any) {
    eval('this.' + map).get(itemkey).Selected = !eval('this.' + map).get(itemkey).Selected;
  }

  public add() {
    const addedItems = new Array<any>();
    for (const item of this.input) {
      if (item[1].Selected) {
        item[1].Selected = false;
        this.output.set(item[0], item[1]);
        addedItems.push(item[1].Data);
        this.input.delete(item[0]);
      }
    }
    this.addEvent.emit({ addedItems });
    this.outputEvent.emit(this.output);
  }

  public remove() {
    const removedItems = new Array<any>();
    for (const item of this.output) {
      if (item[1].Selected) {
        item[1].Selected = false;
        this.input.set(item[0], item[1]);
        removedItems.push(item[1].Data);
        this.output.delete(item[0]);
      }
    }
    this.removeEvent.emit({ removedItems });
    this.outputEvent.emit(this.output);
  }

  public all(map: any) {
    for (const item of eval('this.' + map).values()) {
      item.Selected = true;
    }
  }

  public none(map: any) {
    for (const item of eval('this.' + map).values()) {
      item.Selected = false;
    }
  }

  public trackByIndex(index: any, item: any) {
    return index;
  }

  public getCompleteDisplay(item: any, display: any) {
    let completeDisplay = '';
    display.forEach((d: any, i: any) => {
      completeDisplay += item.Data[d];
      if (i < (display.length - 1)) {
        completeDisplay += this.displaySeparator ? this.displaySeparator : ' - ';
      }
    });
    return completeDisplay;
  }

  public filterInput(items: any, e: any) {
    const regExp1 = '[a-zA-Z0-9?!"·$%&/()=?¿|@#~€¬^*¨Ç;:_]*';
    const regExp2 = '[a-zA-Z0-9?!"·$%&/()=?¿|@#~€¬^*¨Ç;:_]*';
    this.filterInputKey = e.target.value;
    const regExp = new RegExp(regExp1 + this.filterInputKey + regExp2, 'i');
    if (!this.filterInputKey) {
      this.filterInputKey = e.target.value;
    }
    if (items) {
      items.forEach((i: any) => {
        if (this.filterInputKeys) {
          for (const arg of this.filterInputKeys) {
            if (regExp.test(i[1].Data[arg])) {
              i[1].Visible = true;
              break;
            } else {
              i[1].Visible = false;
            }
          }
        }
      });
    }
  }

  public filterOutput(items: any, e: any) {
    const regExp1 = '[a-zA-Z0-9?!"·$%&/()=?¿|@#~€¬^*¨Ç;:_]*';
    const regExp2 = '[a-zA-Z0-9?!"·$%&/()=?¿|@#~€¬^*¨Ç;:_]*';
    this.filterOutputKey = e.target.value;
    const regExp = new RegExp(regExp1 + this.filterOutputKey + regExp2, 'i');
    if (!this.filterOutputKey) {
      this.filterOutputKey = e.target.value;
    }
    if (items) {
      items.forEach((i: any) => {
        if (this.filterOutputKeys) { 
          for (const arg of this.filterOutputKeys) {
            if (regExp.test(i[1].Data[arg])) {
              i[1].Visible = true;
              break;
            } else {
              i[1].Visible = false;
            }
          }
        }
      });
    }
  }

}
