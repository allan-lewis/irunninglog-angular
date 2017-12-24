import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ProfileComponent } from './profile.component';
import { PingComponent } from '../ping/ping.component';
import { ProfileService } from './profile.service';
import { PingService } from '../ping/ping.service';
import { LogoutComponent } from './logout.component';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { AuthenticationModel } from '../state/authentication.model';
import { profileModelReducer } from '../state/profile.reducer';
import { PingModel } from '../state/ping.model';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { MockBackend, MockConnection } from '@angular/http/testing';

let authenticationModel = new AuthenticationModel(); 

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,  
        MaterialModule.forRoot(),
        StoreModule.provideStore({
          auth: authenticationModelReducer,
          profile: profileModelReducer
        })
      ],
      declarations: [
        HeaderComponent,
        ProfileComponent,
        PingComponent,
        LogoutComponent
      ],
      providers: [
        ProfileService,  
        PingService,      
          {
          provide: XHRBackend,
          useClass: MockBackend
        },
        [{provide: Scheduler, useClass: NoOpScheduler}]
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
    comp.ping = new PingModel();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('irunninglog');
  }));
  
});