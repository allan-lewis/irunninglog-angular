import { TestBed, async } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ProfileComponent } from './profile.component';
import { LogoutComponent } from './logout.component';
import { MdToolbarModule, MdCardModule, MdButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { authenticationModelReducer } from '../authentication/authentication.reducer';
import { AuthenticationModel } from '../authentication/authentication.model';
import { profileReducer } from '../profile.reducer';

let authenticationModel = new AuthenticationModel(); 

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        MdToolbarModule,
        MdCardModule,
        MdButtonModule,
        StoreModule.provideStore({
          auth: authenticationModelReducer,
          profile: profileReducer
        })
      ],
      declarations: [
        HeaderComponent,
        ProfileComponent,
        LogoutComponent
      ],
      providers: [
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'irunninglog'`, async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('irunninglog');
  }));

  it('should render title in a span tag', async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    let comp = fixture.componentInstance;
    comp.authenticationModel = authenticationModel;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('irunninglog');
  }));
});