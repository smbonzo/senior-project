import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import {MatCardModule} from "@angular/material/card";
import {Event} from "../../../domain/Event";
import {EventService} from "./EventService";
import {of} from "rxjs";
const createSpyObj= jasmine.createSpyObj;

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let eventServiceSpy = createSpyObj('EventService', ['getEvents']);
  eventServiceSpy.getEvents.and.returnValue(of(Array(new Event({
      name: "name",
      description: "description",
      date: new Date().toDateString(),
      eventID: "id",
      isRecurring: true,
      organizer: "organizer",
      location: "location",
      isRequired: true,
  }))));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      providers: [{provide: EventService, useValue: eventServiceSpy}],
      declarations: [EventsComponent]
    });
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});