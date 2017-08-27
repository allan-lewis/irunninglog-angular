import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { LogoutComponent } from './logout.component';
import { StoreModule, Store } from '@ngrx/store';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { AuthenticationModel, AuthenticationState } from '../state/authentication.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { ConfirmService } from '../confirm/confirm.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { profileModelReducer } from '../state/profile.reducer';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { AppState } from '../state/app.state';
import { MdIconModule, MdDialogModule } from '@angular/material';


import { NgModule } from '@angular/core';

let authenticationModel = new AuthenticationModel(); 

@NgModule({
  imports: [MdDialogModule],
  declarations: [ConfirmComponent],
  entryComponents: [ConfirmComponent]
})
export class FakeTestDialogModule {}

describe('LogoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [   
        FakeTestDialogModule,     
        HttpModule,
        MdIconModule,
        StoreModule.provideStore({
          authentication: authenticationModelReducer,
          profile: profileModelReducer
        })
      ],
      declarations: [
        LogoutComponent
      ],
      providers: [    
          AuthenticationService,  
          ConfirmService,
          {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ConfirmComponent],
        },
      }).compileComponents();
  }));

 it('should create the logout component', fakeAsync(
    inject([
      XHRBackend,
      Store
    ], (mockBackend, store: Store<AppState>) => {
        const fixture = TestBed.createComponent(LogoutComponent);
        fixture.detectChanges();
    })
  ));
  
  // TODO - Test the confirm component
  //  it('should use the logout component to logout', fakeAsync(
  //   inject([
  //     XHRBackend,
  //     Store
  //   ], (mockBackend, store: Store<AppState>) => {
  //       const fixture = TestBed.createComponent(LogoutComponent);
  //       fixture.detectChanges();

  //       const confirm = TestBed.createComponent(ConfirmComponent);
  //       confirm.detectChanges();

  //       fixture.componentInstance.logout();
  //   })
  // ));
  
});