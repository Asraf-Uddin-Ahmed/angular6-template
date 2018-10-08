import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../../node_modules/font-awesome/css/font-awesome.css',
    './file-upload.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit {

  @Input() supportMultiple: boolean;
  @Input() showBottomActionButtons: boolean;
  @Input() showPreview: boolean;

  @Output() onFileOverDropZone = new EventEmitter();
  @Output() afterAddingFile = new EventEmitter();
  @Output() onProgress = new EventEmitter();
  @Output() onSuccess = new EventEmitter();
  @Output() onError = new EventEmitter();

  public uploader: FileUploader;
  public hasDropZoneOver = false;
  public filePreviewPath: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.uploader = new FileUploader({
      disableMultipart: true,
      method: 'PUT'
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.filePreviewPath = this.getPreviewUrl(fileItem);

      fileItem.headers = [{ name: 'Content-Type', value: fileItem.file.type }];
      fileItem.withCredentials = false;
      this.afterAddingFile.emit(fileItem);
    };

    this.uploader.onSuccessItem = (fileItem: FileItem) => {
      this.onSuccess.emit(fileItem);
    };

    this.uploader.onErrorItem = (fileItem: FileItem) => {
      this.onError.emit(fileItem);
    };

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      this.onProgress.emit({
        fileItem: fileItem,
        progress: progress
      });
    };
  }

  public fileOverDropZone(e: any): void {
    this.hasDropZoneOver = e;
    this.onFileOverDropZone.emit();
  }

  public getPreviewUrl(fileItem: FileItem): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
  }
}
