import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ProfileModel } from '../state/profile.model';

@Component({
  selector: 'irl-component-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnChanges {

  @Input()
  profile: ProfileModel;

  ngOnChanges(): void {
    // console.log('ProfileComponent:ngOnChanges');
  }

}
