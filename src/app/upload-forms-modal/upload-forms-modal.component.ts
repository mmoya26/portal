import { Component, Output, EventEmitter, Input} from '@angular/core';
import { DropdownModule, DropdownChangeEvent } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayOptions, OverlayListenerOptions } from 'primeng/api';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { UploadForm } from '../interfaces/upload-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-forms-modal',
  standalone: true,
  imports: [DropdownModule, DialogModule, InputTextareaModule, FormsModule, FileUploadModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload-forms-modal.component.html',
  styleUrl: './upload-forms-modal.component.css'
})
export class UploadFormsModalComponent {

  @Input() isVisible! : boolean
  @Output() hideUploadForms = new EventEmitter<boolean>();

  uploadFormsForm = new FormGroup({
    formType: new FormControl(''),
    taxYear: new FormControl(''),
    isFileProductionType: new FormControl(false),
    notes: new FormControl(''),
    fileUploaded: new FormControl('')
  })

  handleFileUploaded({files} : FileUploadEvent) {
    const fileName = files[0].name;
    this.uploadFormsForm.patchValue({fileUploaded: fileName});
  }

  handleFileType(event: Event) {
    const target = event.target as HTMLButtonElement;
    target.innerHTML.toLocaleLowerCase() === 'production' ? this.uploadFormsForm.patchValue({isFileProductionType: true}) : this.uploadFormsForm.patchValue({isFileProductionType: false});
  }

  
  hide() {
    this.hideUploadForms.emit(false);
  }

  onSubmit() {
    console.log(this.uploadFormsForm.value);
  }

  getOverlayOptions(): OverlayOptions {
    return {
      listener: (event: Event, options?: OverlayListenerOptions) => {
        if (event.type === "click") {
          return true
        }
        return false;
      }
    };
}

  public formTypes: Object[] = ["1099-NEC", "1099-MISC",  "1099-INT", "W-2"];
  public taxYear: Object[] = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
}
