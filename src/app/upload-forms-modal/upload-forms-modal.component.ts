import { Component, Output, EventEmitter, Input} from '@angular/core';
import { DropdownModule, DropdownChangeEvent } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayOptions, OverlayListenerOptions } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { UploadForm } from '../interfaces/upload-form';

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
  form = {} as UploadForm

  handleFileUploaded({files} : FileUploadEvent) {
    const file = files[0];
    this.form.fileUploaded = file.name

    console.log(this.form);
  }

  handleFileType(event: Event) {
    const target = event.target as HTMLButtonElement;

    if (target.innerHTML.toLocaleLowerCase() === 'production') {
      this.form.isFileProductionType = true
    } else {
      this.form.isFileProductionType = false
    }

    console.log(this.form);
   }

  handleDropdown({value}: DropdownChangeEvent) {
    if (value.fieldName === 'formType') {
      this.form.formType = value.formType
    } else if (value.fieldName === 'taxYear') {
      this.form.taxYear = value.year
    }

    console.log(this.form);
  }
  
  hide() {
    this.hideUploadForms.emit(false);
    this.form = {} as UploadForm;

    console.log(this.form)
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

  public formTypes: Object[] = [{fieldName: "formType", formType: "1099-NEC"}, {fieldName: "formType", formType: "1099-MISC"}, {fieldName: "formType", formType: "1099-INT"}, {fieldName: "formType", formType: "W-2"}];
  public taxYear: Object[] = [
    {fieldName: "taxYear", year: "2016"}, {fieldName: "taxYear", year: "2017"},
    {fieldName: "taxYear", year: "2018"}, {fieldName: "taxYear", year: "2019"}, 
    {fieldName: "taxYear", year: "2020"}, {fieldName: "taxYear", year: "2021"}, 
    {fieldName: "taxYear", year: "2022"}, {fieldName: "taxYear", year: "2023"},
  ];
}
