import { Component, Output, EventEmitter} from '@angular/core';
import { RecipientDataReview } from '../interfaces/recipient-data-review';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadFormsModalComponent } from '../upload-forms-modal/upload-forms-modal.component';

@Component({
  selector: 'app-recipient-data-review-table',
  standalone: true,
  imports: [ConfirmDialogModule, UploadFormsModalComponent],
  templateUrl: './recipient-data-review-table.component.html',
  styleUrl: './recipient-data-review-table.component.css',
  providers: [ConfirmationService, MessageService],
})
export class RecipientDataReviewTableComponent {
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  public recipientDataReviewRecords: RecipientDataReview[] = [
    {
      id: 1,
      companyName: "ABC Company",
      formType: "1099-NEC",
      taxYear: "2023",
      fileType: "Production",
      status: "Approved"
    },
    {
      id: 2,
      companyName: "XYZ Corporation",
      formType: "1099-MISC",
      taxYear: "2023",
      fileType: "Production",
      status: "Needs Review"
      },
      {
      id: 3,
      companyName: "123 Industries",
      formType: "W-2",
      taxYear: "2023",
      fileType: "Test",
      status: "Needs Review"
      },
      {
      id: 4,
      companyName: "DEF Enterprises",
      formType: "1099-INT",
      taxYear: "2023",
      fileType: "Production",
      status: "Rejected"
      },
      {
        id: 5,
        companyName: "EFG Corp",
        formType: "W-2",
        taxYear: "2023",
        fileType: "Test",
        status: "Needs Review"
        },
        {
        id: 6,
        companyName: "GHI Enterprises",
        formType: "1099-DIV",
        taxYear: "2023",
        fileType: "Production",
        status: "Approved"
        },
        {
        id: 7,
        companyName: "JKL Corporation",
        formType: "W-2",
        taxYear: "2023",
        fileType: "Test",
        status: "Needs Review"
        },
        {
        id: 8,
        companyName: "MNO Industries",
        formType: "1099-MISC",
        taxYear: "2023",
        fileType: "Production",
        status: "Needs Review"
        },
        {
          id: 9,
          companyName: "PQR Solutions",
          formType: "1099-NEC",
          taxYear: "2023",
          fileType: "Test",
          status: "Needs Review"
          },
          {
          id: 10,
          companyName: "STU Enterprises",
          formType: "W-2",
          taxYear: "2023",
          fileType: "Production",
          status: "Approved"
          }
  ]

  @Output() showUploadFormsModalEvent = new EventEmitter<boolean>()

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

