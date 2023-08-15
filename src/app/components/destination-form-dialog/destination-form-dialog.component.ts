import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from 'src/app/shared/form.service';
import { AllowedStops } from 'src/app/shared/models/allowed-stops.model';
import { Axe } from 'src/app/shared/models/axe.model';
import { City } from 'src/app/shared/models/city.model';
import {
  TrainType,
} from 'src/app/shared/models/train.model';

@Component({
  selector: 'app-destination-form-dialog',
  templateUrl: './destination-form-dialog.component.html',
  styleUrls: ['./destination-form-dialog.component.scss'],
})
export class DestinationFormDialogComponent {
  selectedType: TrainType;
  axeForm: FormGroup;
  cities: City[];
  axes: Axe[];
  rideAllowedStops: [];
  allowedStopList: AllowedStops;
  stops: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('stopsInput') stopsInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<DestinationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { axe: Axe } | undefined,
    private formService: FormService
  ) {
    this.axeForm = this.formService.buildAxeForm(this.data?.axe);

    console.log("the aaexeee", this.axeForm)
  }


  onQuit(): void {
    this.dialogRef.close();
  }

  getDialogResult(trainForm: FormGroup, trainId?: number) {
    // this.trainForm.markAllAsTouched();

    // if (!this.trainForm.invalid) {
    //   this.dialogRef.close({
    //     id: trainId,
    //     ...trainForm.value,
    //   });
    // }
  }

  getModalTitle() {
    // return this.data?.train?.number
    //   ? `Edit train ${this.data.train.number}`
    //   : 'Add Train';
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('pattern')) {
      return 'only RE, FA foolowed by 3 numbers allowed';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }

}
