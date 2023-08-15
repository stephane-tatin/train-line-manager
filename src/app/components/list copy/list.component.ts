import { Component, OnInit } from '@angular/core';
import { AllowedStops } from 'src/app/shared/models/allowed-stops.model';
import { TrainService } from 'src/app/shared/train.service';
import { MatDialog } from '@angular/material/dialog';
import { CityService } from 'src/app/shared/city.service';
import { AllowedStopService } from 'src/app/shared/allowed-stops.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { City } from 'src/app/shared/models/city.model';
import { AxeService } from 'src/app/shared/axe.service';
import { Axe } from 'src/app/shared/models/axe.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  cityList: City[];
  axeList: Axe[];
  allowedStopList: AllowedStops[];


  constructor(
    private dialog: MatDialog,
    private trainService: TrainService,
    private cityService: CityService,
    private allowedStopService: AllowedStopService,
    private axeService: AxeService
  ) {
    this.cityService
      .getCities()
      .subscribe((cityList) => (this.cityList = cityList));

    this.axeService
      .getAxes()
      .subscribe((axeList) => (this.axeList = axeList));

    
    // this.allowedStopService
    //   .getAllowedStops()
    //   .subscribe((allowedStopList) => (this.allowedStopList = allowedStopList));
  }

  ngOnInit(): void {}

  addTrain() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { cityList: this.cityList, axeList: this.axeList },
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
