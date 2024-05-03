import { Component, Output, EventEmitter, inject, OnInit} from '@angular/core';
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadFormsModalComponent } from '../upload-forms-modal/upload-forms-modal.component';
import { v4 as uuidv4 } from 'uuid'
import { RecipientDataReviewService } from '../service/recipient-data-review.service';

@Component({
  selector: 'app-recipient-data-review-table',
  standalone: true,
  imports: [ConfirmDialogModule, UploadFormsModalComponent],
  templateUrl: './recipient-data-review-table.component.html',
  styleUrl: './recipient-data-review-table.component.css',
  providers: [ConfirmationService, MessageService],
})
export class RecipientDataReviewTableComponent implements OnInit{

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private dataReviewService: RecipientDataReviewService) {
  }

  public recipientDataReviewRecords: RecipientDataReviewRecord[] = []

  @Output() showUploadFormsModalEvent = new EventEmitter<boolean>()


  ngOnInit(): void {
    this.dataReviewService.recipientDataReviewRecords$.subscribe((records) => {
      this.recipientDataReviewRecords = records;
    });
  }

  open(event: Event, formType: string) {
    console.log(formType)
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'You do not have access to Recipient Data Review. Please contact your team administrator.',
        header: 'Restricted Permissions',
        acceptIcon:"none",
        rejectVisible: false,
        acceptLabel: "OK",
    });
  }

  toggleUploadForms() {
    this.showUploadFormsModalEvent.emit(true);
  }

  getStatusClass(status: string) {
    switch(status.toLocaleLowerCase()) {
      case 'needs review':
        return 'needs-review'
      case 'approved':
        return ''
      case 'rejected':
        return 'rejected'

      default:
        return ''
    }
  }
}

