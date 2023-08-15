import { Injectable } from '@angular/core';
import { Train } from './models/train.model';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Axe } from './models/axe.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  buildTrainForm(train?: Train) {
    const trainForm = new FormGroup({
      number: new FormControl(train?.number || '', [
        Validators.required,
        Validators.pattern('^[FA|RE]{2}[0-9]{3}?$'),
      ]),
      departure: new FormControl(train?.departure || '', Validators.required),
      departureTime: new FormControl(train?.departureTime || '', [
        Validators.required,
      ]),
      departureDate: new FormControl(train?.departureDate ? new Date(train?.departureDate) : '', [
        Validators.required,
      ]),
      arrival: new FormControl({value: train?.arrival || '', disabled: true}, Validators.required),
      arrivalDate: new FormControl(train?.arrivalDate ? new Date(train?.arrivalDate) : '', Validators.required),
      arrivalTime: new FormControl(train?.arrivalTime || '', [
        Validators.required,
      ]),
      stationsStops: new FormControl(train?.stationsStops || [], Validators.required),
      type: new FormControl(train?.type || '', Validators.required),
    });

    return trainForm;
  }

  validateForm(trainForm: FormGroup) {
    return this.getValidationErrors(trainForm);
  }

  getValidationErrors(trainForm: FormGroup) {
    let validationErrors: Array<{ [field: string]: ValidationErrors | null }> =
      [];
    for (const field in trainForm.controls) {
      const control = trainForm.get(field)!;
      validationErrors.push({ [field]: control.errors });
    }
    return validationErrors;
  }

  buildAxeForm(axe?: Axe) {
    const axeForm = new FormGroup({
      name: new FormControl(axe?.name || '', [
        Validators.required,
        Validators.pattern('^[FA|RE]{2}[0-9]{3}?$'),
      ]),

      ...this.getFormControlsCityFields(axe?.cityList || [])
    });

    return axeForm;
  }

  getFormControlsCityFields(cityList: string[]) {
    const formGroupFields: any = {} ;
    for (const [index, city] of cityList.entries()) {
        formGroupFields[`city${index}`] = new FormControl(city);
    }
    return formGroupFields;
}
}
