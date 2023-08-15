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
import { DestinationFormDialogComponent } from '../destination-form-dialog/destination-form-dialog.component';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.scss'],
})
export class DestinationListComponent implements OnInit {
  cityList: City[];
  axeList: Axe[];
  allowedStopList: AllowedStops[];
  axeList$;

  displayedColumns: string[] = [
    'name',
    'cityList'
  ];


  constructor(
    private dialog: MatDialog,
    private axeService: AxeService
  ) {
    this.axeService
      .getAxes()
      .subscribe((axeList) => {console.log("helloosoooo", axeList);(this.axeList = axeList)});
    
    this.axeList$ = this.axeService.axeState$;

  }

  ngOnInit(): void {}

  addAxe() {
    const dialogRef = this.dialog.open(DestinationFormDialogComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.trainService.addTrain(result).subscribe((train) => {
    //       this.trainService.source.next(
    //         this.trainService.source.value.concat(train)
    //       );
    //     });
    //   }
    // });
  }

  editAxe(row: Axe) {
    const dialogRef = this.dialog.open(DestinationFormDialogComponent, {
      data: {
        axe: row
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.trainService.updateTrain(result).subscribe((res) => {});
    //     this.trainService.loadTrains();
    //   }
    // });
  }

}
