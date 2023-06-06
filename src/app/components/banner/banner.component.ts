import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})

export class BannerComponent {
  @Input() user: User;
}
