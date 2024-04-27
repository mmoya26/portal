import { Injectable } from '@angular/core';
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class RecipientDataReviewService {

  public recipientDataReviewRecords: RecipientDataReviewRecord[] = []

  constructor() { }

  updateRecords(record: RecipientDataReviewRecord) {
    this.recipientDataReviewRecords.push(record);
  }

  getAllRecords() {
    return this.recipientDataReviewRecords;
  }
}
