import { Component, Input, Output, EventEmitter} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-upload-forms-modal',
  standalone: true,
  imports: [DropdownModule, DialogModule],
  templateUrl: './upload-forms-modal.component.html',
  styleUrl: './upload-forms-modal.component.css'
})
export class UploadFormsModalComponent {
  @Input() isVisible : boolean = false
  @Output() modalClosedEvent = new EventEmitter<boolean>();
  
  hide() {
    this.modalClosedEvent.emit(false);
  }
}
