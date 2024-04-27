import { Injectable } from '@angular/core';
import { RecipientDataReview } from '../interfaces/recipient-data-review';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class RecipientDataReviewService {

  public recipientDataReviewRecords: RecipientDataReview[] = [
    {
      id: uuidv4(),
      formType: "1099-NEC",
      taxYear: "2023",
      isFileProductionType: true,
      notes: "Test Notes",
      fileUploaded: "Photo.png",
      status: "Approved",
      companyName: "TST Company"
    },

    {
      id: uuidv4(),
      formType: "1099-MISC",
      taxYear: "2022",
      isFileProductionType: false,
      notes: "More Notes",
      fileUploaded: "Photo_2.png",
      status: "Needs Review",
      companyName: "CCB Company"
    },
  ]

  constructor() { }

  updateRecords(record: any) {
    this.recipientDataReviewRecords.push(record);
  }

  getAllRecords() {
    return this.recipientDataReviewRecords;
  }
}
