import { Component, Output, EventEmitter, Input} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayOptions, OverlayListenerOptions } from 'primeng/api';

@Component({
  selector: 'app-upload-forms-modal',
  standalone: true,
  imports: [DropdownModule, DialogModule],
  templateUrl: './upload-forms-modal.component.html',
  styleUrl: './upload-forms-modal.component.css'
})
export class UploadFormsModalComponent {

  @Input() isVisible! : boolean

  @Output() hideUploadForms = new EventEmitter<boolean>();
  
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
