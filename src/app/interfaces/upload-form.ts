import { FormControl } from "@angular/forms";

export interface UploadForm {
    formType: FormControl<string>;
    taxYear: FormControl<string>,
    isFileProductionType: FormControl<boolean>,
    notes: FormControl<string>,
    fileUploaded: FormControl<string>
}
