import { Component, Output, EventEmitter, Input} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-upload-forms-modal',
  standalone: true,
  imports: [DropdownModule, DialogModule],
  templateUrl: './upload-forms-modal.component.html',
  styleUrl: './upload-forms-modal.component.css'
})
export class UploadFormsModalComponent {

  @Input() isVisible! : boolean

  @Output() hideUploadForms = new EventEmitter<false>();
  
  hide() {
    this.hideUploadForms.emit(false);
  }

  public formTypes: Object[] = [{formType: "1099-NEC"}, {formType: "1099-MISC"}, {formType: "1099-INT"}, {formType: "W-2"}];
  public fileTypes: Object[] = [{fileTypes: "Production"}, {fileTypes: "Test"}];
}
