import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import { FormDialogComponent } from './form-dialog.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { findEl, getText, setFieldValue } from 'src/app/shared/testing/helpers';


function assignHarnessesToFields(inputHarnesses: MatInputHarness[]) {
  return  {
    numberField: inputHarnesses[0],
    departureField: inputHarnesses[1],
    departureDateField: inputHarnesses[2]
  }
} 

fdescribe('FormDialogComponent', () => {
  let component: FormDialogComponent;
  let componentSpy: jasmine.SpyObj<FormDialogComponent>;
  let fixture: ComponentFixture<FormDialogComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDialogComponent],
      providers: [
        FormDialogComponent,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    componentSpy = TestBed.inject(FormDialogComponent) as jasmine.SpyObj<FormDialogComponent>;

    fixture = TestBed.createComponent(FormDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    // await loader.getHarness(MatDialogHarness);
    // fixture.detectChanges();

  });

  it('should submit the form successfully', async () => {
  // const harnesses = await loader.getAllHarnesses(MatInputHarness)

  const inputHarnesses = await loader.getAllHarnesses(MatInputHarness)
  const {numberField, departureField, departureDateField} = assignHarnessesToFields(inputHarnesses) 
  const buttonHarnesses = await loader.getAllHarnesses(MatButtonHarness)

  console.log("mama mia",await buttonHarnesses[0].getText()) 

  await numberField.setValue("FA123")
  await departureField.setValue("Berlin")
  await departureDateField.setValue("12.15.2021")

  console.log( await buttonHarnesses[1].getText())

  await buttonHarnesses[1].click()

  // await harnesses[0].setValue("FA123")
  // const theVal = await harnesses[0].getValue()
  // console.log("a simple test", theVal)
    expect(component).toBeDefined();
  });
});
