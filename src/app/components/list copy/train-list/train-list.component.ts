import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Train } from 'src/app/shared/models/train.model';
import { TrainService } from 'src/app/shared/train.service';
import { AllowedStops } from 'src/app/shared/models/allowed-stops.model';
import { formatDate, TitleCasePipe } from '@angular/common';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import { City } from 'src/app/shared/models/city.model';
import { Axe } from 'src/app/shared/models/axe.model';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss'],
})
export class TrainListComponent {
  trainList: Train[];
  @Input() cityList: City[];
  @Input() axeList: Axe[];
  trainList$;
  displayedColumns: string[] = [
    'number',
    'departure',
    'arrival',
    'Stops',
    'type',
  ];
  clickedRows = new Set<Train>();

  constructor(
    public dialog: MatDialog,
    private trainService: TrainService,
    private titleCasePipe: TitleCasePipe
  ) {
    this.trainList$ = this.trainService.trainState$;
    this.trainService.loadTrains();
  }

  editTrain(row: Train) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        train: row,
        cityList: this.cityList,
        axeList: this.axeList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainService.updateTrain(result).subscribe((res) => {});
        this.trainService.loadTrains();
      }
    });
  }

  displayStationStops(train: Train) {
    return train.stationsStops
      .map((stop) => this.titleCasePipe.transform(stop))
      .toString()
      .replace(',', '-');
  }

  getDisplayDepartureInfos(train: Train) {
    return `${this.titleCasePipe.transform(train.departure)} - ${
      train.departureDate
    } - ${train.departureTime}`;
  }

  getDisplayArrivalInfos(train: Train) {
    return `${this.titleCasePipe.transform(train.arrival)} - ${formatDate(
      train.arrivalDate,
      'shortDate',
      'en'
    )} - ${train.arrivalTime}`;
  }
}
