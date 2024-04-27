// Angular Imports
import { Component, Output, EventEmitter, Input, inject, OnInit} from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interfaces & Services
import { RecipientDataReviewRecord } from '../interfaces/recipient-data-review-record';
import { UploadForm } from '../interfaces/upload-form';
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
export class UploadFormsModalComponent implements OnInit {
  uploadForm =  this.formBuilder.group({
    id: [uuidv4()],
    formType: [''],
    taxYear: [''],
    isFileProductionType: [false],
    notes: [''],
    fileUploaded: [''],
    status: ['Needs Review'],
    companyName: ['M&M Company']
  });

  constructor(private formBuilder: FormBuilder) {}

  dataReviewService: RecipientDataReviewService = inject(RecipientDataReviewService);

  @Input() isVisible! : boolean
  @Output() hideUploadForms = new EventEmitter<boolean>();

  // uploadForm = new FormGroup<UploadForm>({
  //   id: new FormControl('', {nonNullable: true}),
  //   formType: new FormControl('', {nonNullable: true}),
  //   taxYear: new FormControl('', {nonNullable: true}),
  //   isFileProductionType: new FormControl(false , {nonNullable: true}),
  //   notes: new FormControl('', {nonNullable: true}),
  //   fileUploaded: new FormControl('', {nonNullable: true}),
  //   status: new FormControl('Needs Review', {nonNullable: true}),
  //   companyName: new FormControl('', {nonNullable: true}),
  // })

  ngOnInit() {
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

    // Cast record from FormControls to be RecipientDataReviewRecord and generate UUID and for record
    let record = <RecipientDataReviewRecord>this.uploadForm.value

    this.dataReviewService.updateRecords(record);

    this.uploadForm.reset({id: uuidv4(), formType: '', taxYear: '', isFileProductionType: false, notes: '', fileUploaded: '', status: 'Needs Review', companyName: 'M&M Company' });
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
