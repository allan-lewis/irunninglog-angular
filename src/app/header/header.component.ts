import { Component, Input } from '@angular/core';
import { AuthenticationModel } from '../authentication/authentication.model';

@Component({
  selector: 'irl-component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    
    title = 'irunninglog';

    @Input() authenticationModel: AuthenticationModel;
     
}
