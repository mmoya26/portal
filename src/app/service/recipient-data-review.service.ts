import { Injectable } from '@angular/core';
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class RecipientDataReviewService {
  private subject = new Subject();

  public recipientDataReviewRecords: RecipientDataReviewRecord[] = []

  constructor() { }

  emit(eventName: string, payload: RecipientDataReviewRecord) {
    this.subject.next({eventName, payload});
  }

  listen(eventName: string, callback: (event: any) => void) {
    this.subject.asObservable().subscribe((nextObj: any) => {
      if (eventName === nextObj.eventName) {
        callback(nextObj.payload);
      }
    });
  }

  updateRecords(record: RecipientDataReviewRecord) {
    this.recipientDataReviewRecords.push(record);
  }

  getAllRecords() {
    return this.recipientDataReviewRecords;
  }
}
