import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DualListBoxItem, NgxDuallistboxComponent } from './ngx-duallistbox.component';

describe('NgxDuallistboxComponent', () => {
  let component: NgxDuallistboxComponent;
  let fixture: ComponentFixture<NgxDuallistboxComponent>;

  const emptyArray = new Array<Object>();
  const oneItemArray = [{
    id: '1',
    name: 'Name 1',
    age: '18'
  }];
  const twoItemsArray = [{
    id: '1',
    name: 'Name 1',
    age: '18'
  }, {
    id: '2',
    name: 'Name 2',
    age: '19'
  }];
  const fiveItemsArray = [{
    id: '1',
    name: 'Name 1',
    age: '18'
  }, {
    id: '2',
    name: 'Name 2',
    age: '19'
  },{
    id: '3',
    name: 'Name 3',
    age: '20'
  }, {
    id: '4',
    name: 'Name 4',
    age: '21'
  },{
    id: '5',
    name: 'Name 5',
    age: '22'
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDuallistboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDuallistboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should left container show nothing when "inData" is an empty array', () => {
    component.inData = emptyArray;
    component.inDataProcess(component.inData);
    expect(component.get('input')).toBeTruthy();
    expect(component.get('input')).toBeInstanceOf(Array);
    expect(component.get('input').length).toBe(0);
  })

  it('should left container show one item when "inData" is an one item array', () => {
    
    component.inData = oneItemArray;
    component.inDataProcess(component.inData);
    expect(component.get('input')).toBeTruthy();
    expect(component.get('input')).toBeInstanceOf(Array);
    expect(component.get('input')[0][0]).toBeInstanceOf(String);
    expect(component.get('input')[0][1]).toBeInstanceOf(DualListBoxItem);
  })

  it('should right container show nothing when "outData" is an empty array', () => {
    component.outData = emptyArray;
    component.outDataProcess(component.outData);
    expect(component.get('output')).toBeTruthy();
    expect(component.get('output')).toBeInstanceOf(Array);
    expect(component.get('output').length).toBe(0);
  })

  it('should right container show one item when "outData" is an one item array', () => {
    component.outData = oneItemArray;
    component.outDataProcess(component.outData);
    expect(component.get('output')).toBeTruthy();
    expect(component.get('output')).toBeInstanceOf(Array);
    expect(component.get('output')[0][0]).toBeInstanceOf(String);
    expect(component.get('output')[0][1]).toBeInstanceOf(DualListBoxItem);
  })

  it('should selected one item from availables', () => {
    component.inData = oneItemArray;
    component.inDataProcess(component.inData);
    component.toggle('input', component.get('input')[0][0]);
    expect(component.get('input')[0][1].Selected).toBeTrue();
  })

  it('should selected one item from selected', () => {
    component.outData = oneItemArray;
    component.outDataProcess(component.outData);
    component.toggle('output', component.get('output')[0][0]);
    expect(component.get('output')[0][1].Selected).toBeTrue();
  })

  it('should add one item from availables to selected', () => {
    component.inData = oneItemArray;
    component.inDataProcess(component.inData);
    component.toggle('input', component.get('input')[0][0]);
    component.add();
    expect(component.get('output').length).toBe(1);
  })

  it('should add two items from availables to selected', () => {
    component.inData = twoItemsArray;
    component.inDataProcess(component.inData);
    component.toggle('input', component.get('input')[0][0]);
    component.toggle('input', component.get('input')[1][0]);
    component.add();
    expect(component.get('output').length).toBe(2);
  })

  it('should remove one item from availables to selected', () => {
    component.outData = oneItemArray;
    component.outDataProcess(component.outData);
    component.toggle('output', component.get('output')[0][0]);
    component.remove();
    expect(component.get('input').length).toBe(1);
  })

  it('should remove two item from availables to selected', () => {
    component.outData = twoItemsArray;
    component.outDataProcess(component.outData);
    component.toggle('output', component.get('output')[0][0]);
    component.toggle('output', component.get('output')[1][0]);
    component.remove();
    expect(component.get('input').length).toBe(2);
  })

  it('should select all available items when click selected', () => {
    component.inData = fiveItemsArray;
    component.inDataProcess(component.inData);
    component.all('input');
    expect(component.get('input').filter(i => i[1].Selected).length).toBe(5);
  })

  it('should select none available items when click none', () => {
    component.inData = fiveItemsArray;
    component.inDataProcess(component.inData);
    component.none('input');
    expect(component.get('input').filter(i => i[1].Selected).length).toBe(0);
    component.all('input');
    expect(component.get('input').filter(i => i[1].Selected).length).toBe(5);
    component.none('input');
    expect(component.get('input').filter(i => i[1].Selected).length).toBe(0);
  })

  it('should show complete display when one item display', () => {
    component.inData = oneItemArray;
    component.display = ['name'];
    component.inDataProcess(component.inData);
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(
        By.css('article > div > div:nth-of-type(1) > ul > li'))
        .map(fd => fd.nativeElement.innerText)
        .join('')
    ).toBe('Name 1');
  })

  it('should show complete display when one item display', () => {
    component.inData = oneItemArray;
    component.display = ['name', 'age'];
    component.displaySeparator = ' - ';
    component.inDataProcess(component.inData);
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(
        By.css('article > div > div:nth-of-type(1) > ul > li'))
        .map(fd => fd.nativeElement.innerText)
        .join('')
    ).toBe('Name 1 - 18');
  })

  it('should show complete display when none item display', () => {
    component.inData = [];
    component.display = ['name', 'age'];
    component.displaySeparator = ' - ';
    component.inDataProcess(component.inData);
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(
        By.css('article > div > div:nth-of-type(1) > ul > li'))
        .map(fd => fd.nativeElement.innerText)
        .join('')
    ).toBe('');
  })

  it('should availables filter return one item when filter by name = "Name 1"', () => {
    component.inData = fiveItemsArray;
    component.showFilterInput = true;
    component.display = ['name', 'age'];
    component.displaySeparator = ' - ';
    component.filterInputKeys = ['name', 'age'];
    component.inDataProcess(component.inData);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('article > div > div:nth-of-type(1) > ul > input')).nativeElement;
    input.value = 'Name 1';
    const e = new KeyboardEvent('keyup', {'bubbles':true, 'cancelable':true});
    input.dispatchEvent(e);
    expect(component.get('input').filter(i => i[1].Visible).length).toBe(1);
    
  })
  it('should selected filter return one item when filter by name = "Name 1"', () => {
    component.outData = fiveItemsArray;
    component.showFilterOutput = true;
    component.display = ['name', 'age'];
    component.displaySeparator = ' - ';
    component.filterOutputKeys = ['name', 'age'];
    component.outDataProcess(component.outData);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('article > div > div:nth-of-type(2) > ul > input')).nativeElement;
    input.value = 'Name 1';
    const e = new KeyboardEvent('keyup', {'bubbles':true, 'cancelable':true});
    input.dispatchEvent(e);
    expect(component.get('output').filter(i => i[1].Visible).length).toBe(1);
    
  })

  
});


