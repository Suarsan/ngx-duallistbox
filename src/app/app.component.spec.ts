import { TestBed } from '@angular/core/testing';
import { NgxDuallistboxComponent, NgxDuallistboxModule } from 'projects/suarsan/ngx-duallistbox/src/public-api';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxDuallistboxModule
      ],
      declarations: [
        AppComponent,
        NgxDuallistboxComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
