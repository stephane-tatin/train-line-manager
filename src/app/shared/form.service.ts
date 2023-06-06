import { Injectable } from '@angular/core';
import { Train } from './models/train.model';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

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
      arrival: new FormControl(train?.arrival || '', Validators.required),
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
}
