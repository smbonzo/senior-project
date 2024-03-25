import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioEditComponent } from './portfolio-edit.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { of } from 'rxjs';
import { Endpoints, constructBackendRequest } from 'src/app/util/http-helper';
import { User } from 'src/app/security/domain/user';


describe('PortfolioEditComponent', () => {
  let component: PortfolioEditComponent;
  let fixture: ComponentFixture<PortfolioEditComponent>;
  let httpMock: HttpTestingController;
  let formBuilder: FormBuilder;
  let dialogMock = {
    close: () => { }
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioEditComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
      ],
      providers: [
        MatDialog,
        FormBuilder,
        {provide: MatDialogRef, useValue: dialogMock},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ],
      teardown: {destroyAfterEach: false}
    });
    fixture = TestBed.createComponent(PortfolioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should build form from event', () => {
    const testDate = new Date().toDateString();

    component.currentUser = new User({
      id: '1',
      firstName: "first",
      lastName: "last",
      preferredName: 'name',
      description: "description",
      email: 'email',
      phone: 'phone',
      linkedin: 'linked',
      date: testDate,
      recurring: true,
      organizer: "organizer",
      location: "location",
      eventLink: "sample link",
      buttonLabel: "test",
      imageId: 1,
    });
    component.createForm();

    const sampleForm = formBuilder.group({
      name: ["name"],
      date: [new Date(testDate)], //how it's done when building events
      description: ["description"],
      location: ["location"],
      organizer: ["organizer"],
      link: ["sample link"],
      buttonLabel: ["test"],
      recurring: [true],
    });

    expect(component.portfolioForm.get('description')!.value).toEqual(sampleForm.get('description')!.value);
    expect(component.eventForm.get('date')!.value).toEqual(sampleForm.get('date')!.value);
    expect(component.eventForm.get('recurring')!.value).toEqual(sampleForm.get('recurring')!.value);
  });

  it('should build blank form', () => {
    component.createForm();

    const sampleForm = formBuilder.group({
      name: [null, Validators.required],   //this field is hidden if the task already exists
      date: [null, Validators.required],
      description: [null],
      location: [null, Validators.required],
      organizer: [null, Validators.required],
      link: [null],
      buttonLabel: ['More Info'],
      recurring: [false],
    });

    expect(component.portfolioForm).toBeTruthy();

    expect(component.eventForm.get('description')).toBeTruthy();

    expect(component.eventForm.get('date')).toBeTruthy();
    expect(component.eventForm.get('date')?.hasValidator(Validators.required)).toEqual(true);

    expect(component.eventForm.get('recurring')!.value).toEqual(sampleForm.get('recurring')!.value);
  });

  it('should save event', () => {
    const testDate = new Date().toDateString();

    const testUser = new User({
      name: "name",
      description: "description",
      date: testDate,
      id: '1',
      recurring: true,
      organizer: "organizer",
      location: "location",
      eventLink: "sample link",
      buttonLabel: "test",
      imageId: 1,
    });

    const testData = {
      name: "name",
      description: "description",
      date: new Date(testDate),
      id: 1,
      isRecurring: true,
      organizer: "organizer",
      location: "location",
      eventLink: "sample link",
      buttonLabel: "test",
    }

    component.currentUser = testUser;
    component.eventName = "name";
    component.createForm();

    let spy = spyOn(component.http, 'post').and.returnValue(of(testEvent));
    const url = constructBackendRequest(Endpoints.EDIT_EVENT);
    let spyClose = spyOn(component, 'closeModal');

    component.savePortfolio();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(url, testData);
    expect(spyClose).toHaveBeenCalled();
  });

  it('should create event', () => {
    const testDate = new Date().toDateString();

    const testEvent = new Event({
      name: "name",
      description: "description",
      date: testDate,
      id: 1,
      recurring: true,
      organizer: "organizer",
      location: "location",
      eventLink: "sample link",
      buttonLabel: "test",
      imageId: 1,
    });

    const testData = {
      description: "description",
      date: new Date(testDate),
      name: "name",
      isRecurring: true,
      organizer: "organizer",
      location: "location",
      eventLink: "sample link",
      buttonLabel: "test",
    }

    component.portfolioForm = formBuilder.group({
      name: ["name"],
      date: [new Date(testDate)], //how it's done when building events
      description: ["description"],
      location: ["location"],
      organizer: ["organizer"],
      link: ["sample link"],
      buttonLabel: ["test"],
      recurring: [true],
    });

    let spy = spyOn(component.http, 'post').and.returnValue(of(testEvent));
    const url = constructBackendRequest(Endpoints.CREATE_EVENT);
    let spyClose = spyOn(component, 'closeModal');

    component.savePortfolio();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(url, testData);
    expect(spyClose).toHaveBeenCalled();
  });

  it('should show error', () => {
    const testDate = new Date().toDateString();

    const testPortfolio = new User({
      name: "name",
      description: "description",
      date: testDate,
      id: '1',
      recurring: true,
      organizer: "organizer",
      location: "location",
      eventLink: "sample link",
      buttonLabel: "test",
      imageId: 1,
    });

    component.portfolioForm = formBuilder.group({
      name: ["name"],
      date: [new Date(testDate)], //how it's done when building events
      description: ["description"],
      location: ["location"],
      organizer: ["organizer"],
      link: ["sample link"],
      buttonLabel: ["test"],
      recurring: [true],
    });

    let spy = spyOn(component.http, 'post').and.returnValue(of(null));
    let spyWindow = spyOn(window, 'alert');

    component.savePortfolio();
    expect(spy).toHaveBeenCalled();
    expect(spyWindow).toHaveBeenCalled();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
