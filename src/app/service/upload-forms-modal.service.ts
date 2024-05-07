import { Injectable } from '@angular/core';
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
import { BehaviorSubject } from 'rxjs';
import { RecipientDataReviewService } from './recipient-data-review.service';

// Libraries
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class UploadFormsModalService {

  private _currentRecord: BehaviorSubject<RecipientDataReviewRecord> = new BehaviorSubject<RecipientDataReviewRecord>(
    {
      id: uuidv4(), 
      companyName: '', 
      fileUploaded: '', 
      formType: '', 
      isFileProductionType: false, 
      notes: '', 
      status: 'Needs Review', 
      taxYear: ''
    }
  );

  public currentRecord$ = this._currentRecord.asObservable();

  editRecord(id: string) {
    this._currentRecord.next(this.dataReviewService.getRecordById(id));
  }

  resetCurrentRecord() {
    this._currentRecord.next({id: uuidv4(), companyName: '', fileUploaded: '', formType: '', isFileProductionType: false, notes: '', status: 'Needs Review', taxYear: ''})
  }

  constructor(private dataReviewService: RecipientDataReviewService) { }
}
