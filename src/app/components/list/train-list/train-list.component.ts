import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Train } from 'src/app/shared/models/train.model';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { TrainService } from 'src/app/shared/train.service';
import { AllowedStops } from 'src/app/shared/models/allowed-stops.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss'],
})
export class TrainListComponent {
  trainList: Train[];
  @Input() cityList: string[];
  @Input() allowedStopList: AllowedStops[];
  trainList$;
  displayedColumns: string[] = [
    'number',
    'departure',
    'arrival',
    'Stops',
    'type',
  ];
  clickedRows = new Set<Train>();

  constructor(public dialog: MatDialog, private trainService: TrainService) {
    this.trainList$ = this.trainService.trainState$;
    this.trainService.loadTrains();
  }

  editTrain(row: Train) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        train: row,
        cityList: this.cityList,
        allowedStopList: this.allowedStopList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('hellores', result);
        this.trainService.updateTrain(result).subscribe((res) => {});
        this.trainService.loadTrains();
      }
    });
  }

  displayStationStops(train: Train) {
    return train.stationsStops.toString().replace(',', '-');
  }

  getDisplayDepartureInfos(train: Train) {
    return `${train.departure} - ${train.departureDate} - ${train.departureTime}`;
  }

  getDisplayArrivalInfos(train: Train) {
    return `${train.arrival} - ${formatDate(
      train.arrivalDate,
      'shortDate',
      'en'
    )} - ${train.arrivalTime}`;
  }
}
