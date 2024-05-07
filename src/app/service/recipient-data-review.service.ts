import { Injectable } from '@angular/core';
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
import { v4 as uuidv4 } from 'uuid'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipientDataReviewService {

  private _recipientDataReviewRecords: BehaviorSubject<RecipientDataReviewRecord[]> = new BehaviorSubject<RecipientDataReviewRecord[]>([]);

  public recipientDataReviewRecords$ = this._recipientDataReviewRecords.asObservable();

  constructor() { }

  updateRecords(record: RecipientDataReviewRecord) {
    let current = this._recipientDataReviewRecords.getValue();

    current.push(record);

    this._recipientDataReviewRecords.next(current);
  }

  getRecordById(id: string): RecipientDataReviewRecord {
    let record: RecipientDataReviewRecord = this._recipientDataReviewRecords.getValue().filter(r => r.id === id)[0];
    return record;
  }

}
