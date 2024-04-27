import { Component, Output, EventEmitter, Input} from '@angular/core';
import { DropdownModule, DropdownChangeEvent } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayOptions, OverlayListenerOptions } from 'primeng/api';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { UploadForm } from '../interfaces/upload-form';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-upload-forms-modal',
  standalone: true,
  imports: [DropdownModule, DialogModule, InputTextareaModule, FormsModule, FileUploadModule, ReactiveFormsModule, CommonModule, TooltipModule],
  templateUrl: './upload-forms-modal.component.html',
  styleUrl: './upload-forms-modal.component.css'
})
export class UploadFormsModalComponent {

  @Input() isVisible! : boolean
  @Output() hideUploadForms = new EventEmitter<boolean>();
  @Output() uploadedFormEvent = new EventEmitter()

  uploadFormsForm = new FormGroup<UploadForm>({
    formType: new FormControl('', {nonNullable: true}),
    taxYear: new FormControl('', {nonNullable: true}),
    isFileProductionType: new FormControl(false , {nonNullable: true}),
    notes: new FormControl('', {nonNullable: true}),
    fileUploaded: new FormControl('', {nonNullable: true}),
    id: new FormControl('', {nonNullable: true}),
    status: new FormControl('Needs Review', {nonNullable: true}),
    companyName: new FormControl('TST Company', {nonNullable: true}),
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
    this.uploadFormsForm.patchValue({id: uuidv4()});

    this.uploadedFormEvent.emit(this.uploadFormsForm.value);

    this.uploadFormsForm.reset();
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
