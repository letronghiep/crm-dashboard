import { Component } from '@angular/core';

@Component({
  selector: 'skeleton-loading',
  template: `<div class="space-y-6 animate-pulse">
    <div class="space-y-2">
      <div class="h-3 w-32 bg-gray-300 rounded"></div>
      <div class="h-6 w-48 bg-gray-300 rounded"></div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="h-40 bg-gray-300 rounded-2xl"></div>
      <div class="h-40 bg-gray-300 rounded-2xl"></div>
    </div>

    <div class="space-y-3">
      <div class="h-4 w-40 bg-gray-300 rounded"></div>

      <div class="space-y-2">
        <div class="h-12 bg-gray-300 rounded-xl"></div>
        <div class="h-12 bg-gray-300 rounded-xl"></div>
        <div class="h-12 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  </div>`,
  styles: [
    `
      :host-context(.dark) .bg-gray-300 {
        background-color: #334155;
      }
      .skeleton {
        position: relative;
        overflow: hidden;
        background-color: #e5e7eb;
      }

      .skeleton::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.4),
          transparent
        );
        animation: shimmer 1.5s infinite;
      }

      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `,
  ],
})
export class SkeletonLoadingComponent {}
