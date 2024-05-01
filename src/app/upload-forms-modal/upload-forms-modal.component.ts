// Angular Imports
import { Component, Output, EventEmitter, Input, inject} from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interfaces & Services
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
// import { UploadForm } from '../interfaces/upload-form';
import { RecipientDataReviewService } from '../service/recipient-data-review.service';

// PrimeNG imports
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { OverlayOptions, OverlayListenerOptions } from 'primeng/api';

// Libraries
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-upload-forms-modal',
  standalone: true,
  imports: [DropdownModule, DialogModule, InputTextareaModule, FormsModule, FileUploadModule, ReactiveFormsModule, CommonModule, TooltipModule],
  templateUrl: './upload-forms-modal.component.html',
  styleUrl: './upload-forms-modal.component.css'
})
export class UploadFormsModalComponent {

  constructor(private formBuilder: FormBuilder, private dataReviewService: RecipientDataReviewService) {}

  @Input() isVisible! : boolean
  @Output() hideUploadForms = new EventEmitter<boolean>();

  uploadForm =  this.formBuilder.group({
    id: [uuidv4()],
    formType: ['', [Validators.required]],
    taxYear: ['', [Validators.required]],
    isFileProductionType: [false],
    notes: [''],
    fileUploaded: ['', [Validators.required]],
    status: ['Needs Review'],
    companyName: ['M&M Company']
  });

  get formType() {
    return this.uploadForm.get('formType');
  }

  get notes() {
    return this.uploadForm.get('notes');
  }

  get isFileProductionType() {
    return this.uploadForm.get('isFileProductionType');
  }

  get fileUploaded() {
    return this.uploadForm.get('fileUploaded');    
  }

  get taxYear() {
    return this.uploadForm.get('taxYear');
  }

  handleFileUploaded({files} : FileUploadEvent) {
    const fileName = files[0].name;
    this.uploadForm.patchValue({fileUploaded: fileName});
  }

  handleFileType(event: Event) {
    const target = event.target as HTMLButtonElement;
    target.innerHTML.toLocaleLowerCase() === 'production' ? this.uploadForm.patchValue({isFileProductionType: true}) : this.uploadForm.patchValue({isFileProductionType: false});
  }
  
  hide() {
    this.hideUploadForms.emit(false);
  }

  onSubmit() {

    if(this.uploadForm.valid) {
      // Cast record from FormControls to be RecipientDataReviewRecord and generate UUID and for record
      let record = <RecipientDataReviewRecord>this.uploadForm.value

      this.dataReviewService.emit("addRecipientDataReviewRecord", record);

      // this.dataReviewService.updateRecords(record);

      this.uploadForm.reset({id: uuidv4(), formType: '', taxYear: '', isFileProductionType: false, notes: '', fileUploaded: '', status: 'Needs Review', companyName: 'M&M Company' });
      this.uploadForm.markAsPristine();
    } else {
      console.log("Upload forms invalid...");
      this.uploadForm.markAllAsTouched();
    }
    
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
  public years: Object[] = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
}
