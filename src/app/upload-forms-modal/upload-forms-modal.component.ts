import { Component, Output, EventEmitter, Input} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayOptions, OverlayListenerOptions } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-upload-forms-modal',
  standalone: true,
  imports: [DropdownModule, DialogModule, InputTextareaModule, FormsModule, FileUploadModule],
  templateUrl: './upload-forms-modal.component.html',
  styleUrl: './upload-forms-modal.component.css'
})
export class UploadFormsModalComponent {

  @Input() isVisible! : boolean

  @Output() hideUploadForms = new EventEmitter<boolean>();

  notesField : String  = ''

  onUpload(event : FileUploadEvent) {

  }
  
  hide() {
    this.hideUploadForms.emit(false);
  }

  getOverlayOptions(): OverlayOptions {
    return {
      listener: (event: Event, options?: OverlayListenerOptions) => {
        return false;
      }
    };
}

  public formTypes: Object[] = [{formType: "1099-NEC"}, {formType: "1099-MISC"}, {formType: "1099-INT"}, {formType: "W-2"}];
  public taxYear: Object[] = [{year: "2016"}, {year: "2017"}, {year: "2018"}, {year: "2019"}, {year: "2020"}, {year: "2021"}, {year: "2022"}, {year: "2023"},];
}
