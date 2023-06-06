import { Component, OnInit } from '@angular/core';
import { Train } from 'src/app/shared/models/train.model';
import { TrainService } from 'src/app/shared/train.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
