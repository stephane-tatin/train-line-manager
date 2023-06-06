import { Component, OnInit } from '@angular/core';
import { AllowedStops } from 'src/app/shared/models/allowed-stops.model';
import { TrainService } from 'src/app/shared/train.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CityService } from 'src/app/shared/city.service';
import { AllowedStopService } from 'src/app/shared/allowed-stops.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  cityList: string[];
  allowedStopList: AllowedStops[];

  constructor(
    private dialog: MatDialog,
    private trainService: TrainService,
    private cityService: CityService,
    private allowedStopService: AllowedStopService
  ) {
    this.cityService
      .getCities()
      .subscribe((cityList) => (this.cityList = cityList));
    this.allowedStopService
      .getAllowedStops()
      .subscribe((allowedStopList) => (this.allowedStopList = allowedStopList));
  }

  ngOnInit(): void {}

  addTrain() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { cityList: this.cityList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainService.addTrain(result).subscribe((train) => {
          this.trainService.source.next(
            this.trainService.source.value.concat(train)
          );
        });
      }
    });
  }
}
