import { TestBed, async } from '@angular/core/testing';

import {Auth} from './auth.service';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { usernameReducer } from './username.reducer';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule.forRoot(),
        StoreModule.provideStore({ username: usernameReducer }) ],
      declarations: [
        AppComponent
      ],
      providers: [
        Auth
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'irunninglog'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.toolbarTitle).toEqual('irunninglog');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('irunninglog');
  }));
});
