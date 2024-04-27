import { FormControl } from "@angular/forms";

export interface UploadForm {
    id: FormControl<string>,
    formType: FormControl<string>;
    taxYear: FormControl<string>,
    isFileProductionType: FormControl<boolean>,
    notes: FormControl<string>,
    fileUploaded: FormControl<string>,
    status: FormControl<string>,
    companyName: FormControl<string>,
}
