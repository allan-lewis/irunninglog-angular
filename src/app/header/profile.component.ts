import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { ProfileModel } from '../state/profile.model';

@Component({
  selector: 'irl-component-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit, OnChanges {

  @Input()
  profile: ProfileModel;

  constructor() {
    // console.log('ProfileComponent:constructor');
  }

  ngAfterViewInit(): void {
    // console.log('ProfileComponent:ngAfterViewInit');
  }

  ngOnChanges(): void {
    // console.log('ProfileComponent:ngOnChanges');
  }

}
