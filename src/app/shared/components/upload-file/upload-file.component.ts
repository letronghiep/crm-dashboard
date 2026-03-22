import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
    UploadService,
    UploadedFile,
} from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'upload-file',
  template: `
    <label
      class="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded cursor-pointer hover:bg-gray-50 w-fit"
      [class.opacity-50]="uploading"
    >
      <i class="pi pi-paperclip text-blue-500"></i>
      <span>{{ uploading ? 'Uploading...' : 'Choose File' }}</span>
      <input
        type="file"
        multiple
        class="hidden"
        [disabled]="uploading"
        (change)="onSelect($event)"
      />
    </label>

    <ul *ngIf="attachments.length" class="mt-3 space-y-1">
      <li
        *ngFor="let file of attachments; let i = index"
        class="flex items-center justify-between text-sm px-3 py-2 rounded border border-gray-200 bg-gray-50"
      >
        <span class="flex items-center gap-2 truncate">
          <i class="pi pi-file text-blue-500 shrink-0"></i>
          <span class="truncate">{{ file.name }}</span>
          <span class="text-gray-400 text-xs shrink-0">{{ file.type }}</span>
        </span>
        <button type="button" (click)="removeFile(i)" class="ml-2 shrink-0">
          <i class="pi pi-times text-red-400 hover:text-red-600"></i>
        </button>
      </li>
    </ul>
  `,
})
export class UploadFileComponent implements OnInit, OnDestroy {
  @Input() attachments: UploadedFile[] = [];
  uploading = false;
  private destroy$ = new Subject<void>();

  constructor(private uploadService: UploadService) {}
  ngOnInit(): void {
    console.log(this.attachments);
  }
  onSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    input.value = '';
    this.uploading = true;

    let completed = 0;
    files.forEach((file) => {
      this.uploadService
        .upload(file)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.attachments.push(res);
          },
          error: (err) => {
            console.error(`Failed to upload ${file.name}`, err);
          },
          complete: () => {
            completed++;
            if (completed === files.length) this.uploading = false;
          },
        });
    });
  }

  removeFile(index: number) {
    const file = this.attachments[index];
    this.uploadService
      .delete(file.serverPath)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.attachments.splice(index, 1),
        error: (err) => console.error('Failed to delete file', err),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
