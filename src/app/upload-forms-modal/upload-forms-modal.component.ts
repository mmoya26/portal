// Angular Imports
import { Component, Output, EventEmitter, Input, inject, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interfaces & Services
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
import { RecipientDataReviewService } from '../service/recipient-data-review.service';
import { UploadFormsModalService } from '../service/upload-forms-modal.service';

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
export class UploadFormsModalComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataReviewService: RecipientDataReviewService, private uploadFormsModalService: UploadFormsModalService) {}

  @Input() isVisible! : boolean
  @Output() hideUploadForms = new EventEmitter<boolean>();

  currentRecord: RecipientDataReviewRecord;

  uploadForm = this.formBuilder.group({
    id: [''],
    formType: ['', [Validators.required]],
    taxYear: ['', [Validators.required]],
    isFileProductionType: [false],
    notes: [''],
    fileUploaded: ['', [Validators.required]],
    status: [''],
    companyName: ['']
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

  ngOnInit(): void {
    this.uploadFormsModalService.currentRecord$.subscribe(record => {
      this.uploadForm.setValue(record);
    });
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
    this.resetForm();
  }

  onSubmit() {
    if(this.uploadForm.valid) {
      let record = <RecipientDataReviewRecord> this.uploadForm.value
      this.dataReviewService.updateRecords(record);
      this.resetForm();
    } else {
      console.log("Upload forms invalid...");
      this.uploadForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.uploadFormsModalService.resetCurrentRecord();
    this.uploadForm.markAsPristine();
    this.uploadForm.markAsUntouched();
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
