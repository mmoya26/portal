import { Component } from '@angular/core';
import { RecipientDataReviewStatsComponent } from '../recipient-data-review-stats/recipient-data-review-stats.component';
import { RecipientDataReviewTableComponent } from '../recipient-data-review-table/recipient-data-review-table.component';
import { UploadFormsModalComponent } from '../upload-forms-modal/upload-forms-modal.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RecipientDataReviewStatsComponent, RecipientDataReviewTableComponent, UploadFormsModalComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public isUploadFormsModalVisible = false
}
