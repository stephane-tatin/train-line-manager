import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CityService } from 'src/app/shared/city.service';
import { FormService } from 'src/app/shared/form.service';
import { AllowedStops } from 'src/app/shared/models/allowed-stops.model';
import {
  Train,
  TrainType,
  trainTypes,
} from 'src/app/shared/models/train.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  selectedType: TrainType;
  trainForm: FormGroup;
  cities: string[];
  rideAllowedStops: [];
  allowedStopList: AllowedStops
  stops: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('stopsInput') stopsInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {train: Train, cityList: string [], allowedStopList: AllowedStops} | undefined,
    private formService: FormService,
  ) {
    this.trainForm = this.formService.buildTrainForm(this.data?.train);
    this.cities = this.data?.cityList || []
    this.allowedStopList = this.data?.allowedStopList || {}

    this.data?.train.stationsStops.forEach(stop => this.stops.push(stop))
  }

  get trainTypeOptions() {
    return trainTypes;
  }

  onQuit(): void {
    this.dialogRef.close();
  }

  getDialogResult( trainForm: FormGroup, trainId?: number,) {
    this.trainForm.markAllAsTouched()
    
    this.trainForm.get("stationsStops")?.setValue(this.stops)
    this.dialogRef.close({
      id: trainId,
      ...trainForm.value
    });
  }

  // getCreateDialogResult(trainForm: FormGroup) {
  //   this.trainForm.markAsDirty()
  //   const invalid = this.trainForm.invalid

  //   console.log(this.trainForm)

  //   if (!invalid) {
  //     return this.dialogRef.close(trainForm.value);
  //   }
  
  //   const err =  this.formService.validateForm(trainForm)

  // }

  getModalTitle() {
    return this.data?.train?.number ? `Edit train ${this.data.train.number}`: 'Add Train';
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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.stops.push(event.option.value);
    this.stopsInput.nativeElement.value = '';
    this.trainForm.get("stationsStop")?.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.stops.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.trainForm.get("stops")?.setValue(null);
  }

  remove(stop: string): void {
    const index = this.stops.indexOf(stop);

    if (index >= 0) {
      this.stops.splice(index, 1);
    }
  }

  getDeparture() :string {
    return (this.trainForm.get("departure")?.value as string).toLowerCase()
  }

  getArrival() {
   return (this.trainForm.get("arrival")?.value as string).toLowerCase()
  }

  getRideAllowedStopForStations() : string[] {
    return this.allowedStopList[this.getDeparture()][this.getArrival()]
  }
}
