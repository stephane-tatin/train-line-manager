import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CityService } from 'src/app/shared/city.service';
import { FormService } from 'src/app/shared/form.service';
import { AllowedStops } from 'src/app/shared/models/allowed-stops.model';
import { Axe } from 'src/app/shared/models/axe.model';
import { City } from 'src/app/shared/models/city.model';
import {
  Train,
  TrainType,
  trainTypes,
} from 'src/app/shared/models/train.model';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  selectedType: TrainType;
  trainForm: FormGroup;
  cities: City[];
  axes: Axe[];
  rideAllowedStops: [];
  allowedStopList: AllowedStops;
  stops: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('stopsInput') stopsInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { train: Train; cityList: City[]; axeList: Axe[] } | undefined,
    private formService: FormService
  ) {
    this.trainForm = this.formService.buildTrainForm(this.data?.train);
    this.cities = this.data?.cityList || [];

    this.axes = this.data?.axeList || [];

    console.log('Cities', this.cities);
    console.log('Axes', this.axes);

    if (this.data?.train?.stationsStops) {
      this.data?.train?.stationsStops.forEach((stop) => this.stops.push(stop));
    }
  }

  get departureCities() {
    return this.cities.map((city) => city.name);
  }

  get arrivalCities() {
    let arrivalCities = this.cities.map((city) => city.name);

    if (this.getDeparture()) {
      const possibleAxes = this.cities.find(
        (city) => city.name === this.getDeparture()
      )?.axeList;

      const possibleArrivalCities = possibleAxes?.flatMap((possibleAxe) => {
        return this.axes.find((axe) => axe.name === possibleAxe)?.cityList;
      }).map(cityRef => this.cities.find(city => city.key === cityRef)?.name);

      if (possibleArrivalCities) {
        arrivalCities = possibleArrivalCities as string[];
      }
    }

    return arrivalCities.filter(
      (city) => city !== this.getDeparture()
    );
  }

  get trainTypeOptions() {
    return trainTypes;
  }

  get departureOptions(): string[] {
    if (!this.trainForm.get('arrival')?.value) {
      return this.cities.map((city) => city.name);
    }

    return [];
  }

  onQuit(): void {
    this.dialogRef.close();
  }

  getDialogResult(trainForm: FormGroup, trainId?: number) {
    console.log("hello there", trainForm)
    this.trainForm.markAllAsTouched();

    this.trainForm.get('stationsStops')?.setValue(this.stops);
    if (!this.trainForm.invalid) {
      this.dialogRef.close({
        id: trainId,
        ...trainForm.value,
      });
    }
  }

  getModalTitle() {
    return this.data?.train?.number
      ? `Edit train ${this.data.train.number}`
      : 'Add Train';
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
    this.trainForm.get('stationsStop')?.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.stops.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.trainForm.get('stops')?.setValue(null);
  }

  remove(stop: string): void {
    const index = this.stops.indexOf(stop);

    if (index >= 0) {
      this.stops.splice(index, 1);
    }
  }

  getDeparture(): string {
    return (this.trainForm.get('departure')?.value as string).toLowerCase();
  }

  getArrival() {
    return (this.trainForm.get('arrival')?.value as string).toLowerCase();
  }

  getRideAllowedStopForStations(): string[] {
    const axes = this.getAxesForDepartureAndArrivalCities();

    const cityListForAxes = this.axes.find(
      (axe) => axe.name === axes[0]
    )?.cityList.map(cityRef => 
       this.cities.find(city => city.key === cityRef)?.name!
    );

    const indexDeparture = cityListForAxes?.indexOf(this.getDeparture())!;
    const indexArrival = cityListForAxes?.indexOf(this.getArrival())!;
    const indexes = [indexDeparture, indexArrival].sort();
    if (indexes.length === 2 && cityListForAxes?.length) {
      console.log(indexes);
      return cityListForAxes?.slice(indexes[0] + 1, indexes[1]) || [];
    }
    return [];
  }

  getAxesForDepartureAndArrivalCities(): string[] {
    const departureCity = this.cities.find(
      (city) => city.name.toLowerCase() === this.getDeparture()
    );
    const arrivalCity = this.cities.find(
      (city) => city.name.toLowerCase() === this.getArrival()
    );

    if (departureCity && arrivalCity) {
      const departureAxes = departureCity.axeList;
      const arrivalAxes = arrivalCity.axeList;
      return departureAxes.filter((axe) => arrivalAxes.includes(axe));
    }
    return [];
  }
}
