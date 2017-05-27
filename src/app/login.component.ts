import { Component } from '@angular/core';

@Component({
  selector: 'irl-component-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    login() {
        console.log('login.component:login', window.location.protocol, window.location.host);

        var d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        sessionStorage.setItem('strava_state', uuid);
        window.location.href = 'https://www.strava.com/oauth/authorize?client_id=17706&response_type=code&redirect_uri=' + window.location.protocol + '//' + window.location.host + '&state=' + uuid;
    }

}
