import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface TimeOption {
  label: string;
  value: string;
}

@Component({
  selector: 'input-time-select',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTimeComponent),
      multi: true,
    },
  ],
})
export class InputTimeComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @ViewChild('dd') dropdown: any;
  @Input() placeholder: string = 'Chọn hoặc nhập thời gian (HHmm)';
  @Input() disabled: boolean = false;
  timeOptions: TimeOption[] = [];
  selectedTime: any = null;

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.generateTimeOptions();
  }
  ngAfterViewInit() {
    const input = this.dropdown.el.nativeElement.querySelector('input');

    input.addEventListener('blur', (e: any) => {
      this.handleBlur(e.target.value);
    });
  }
  handleBlur(value: string) {
    const parsed = this.parseTimeInput(value);

    if (!parsed) {
      this.onClear();
      return;
    }

    this.selectedTime = {
      label: parsed,
      value: parsed,
    };

    // update lại list theo phút
    const minutes = parsed.split(':')[1];
    this.generateTimeOptions(minutes);

    this.onChange(parsed);
    this.onTouched();
  }
  // Generate time options with :00 minutes (like Jira)
  // generateTimeOptions(minutes?: string) {
  //   this.timeOptions = [];
  //   const step = 30;

  //   for (let hour = 0; hour < 24; hour++) {
  //     for (let minute = 0; minute < 60; minute += step) {
  //       const hourStr = hour.toString().padStart(2, '0');
  //       let minutesStr = minutes
  //         ? minutes.toString().padStart(2, '0')
  //         : new Date().getMinutes().toString().padStart(2, '0');
  //       if (minutesStr.length === 1) {
  //         minutesStr = '0' + minutesStr;
  //       }
  //       const timeValue = `${hourStr}:${minutesStr}`;

  //       this.timeOptions.push({
  //         label: timeValue,
  //         value: timeValue,
  //       });
  //     }
  //   }
  // }
  generateTimeOptions(startMinute?: string, step: number = 30) {
    this.timeOptions = [];

    const start = new Date();

    // nếu có truyền minute thì override
    if (startMinute !== undefined) {
      start.setMinutes(Number(startMinute));
    }

    start.setSeconds(0);
    start.setMilliseconds(0);

    const current = new Date(start);

    while (current.getDate() === start.getDate()) {
      const hourStr = current.getHours().toString().padStart(2, '0');
      const minuteStr = current.getMinutes().toString().padStart(2, '0');

      const timeValue = `${hourStr}:${minuteStr}`;

      this.timeOptions.push({
        label: timeValue,
        value: timeValue,
      });

      current.setMinutes(current.getMinutes() + step);
    }
  }

  // ControlValueAccessor implementation
  // QUAN TRỌNG: Được gọi khi FormControl.setValue() hoặc form.patchValue()
  // Đây là luồng ngược: FormControl → Component
  writeValue(value: string | null): void {
    if (!value) {
      this.selectedTime = null;
      return;
    }
    this.selectedTime = {
      label: value,
      value: value,
    };

    // Nếu có giá trị, cập nhật dropdown options với phút tương ứng
    if (value && value.includes(':')) {
      const minutes = value.split(':')[1];
      this.generateTimeOptions(minutes);
    }

    // Force Angular detect changes để cập nhật view
    this.cdr.detectChanges();
  }

  // Đăng ký callback để thông báo thay đổi lên FormControl
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  // Đăng ký callback để thông báo khi user tương tác (touched)
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Handle dropdown change (both selection and manual input)
  onDropdownChange(event: any) {
    const value = event.value;

    if (!value) {
      this.selectedTime = null;
      this.generateTimeOptions();
      this.onChange(null);
      return;
    }

    // Try to parse the input
    const parsedTime = this.parseTimeInput(value);
    // Update dropdown options with the new minutes
    if (parsedTime) {
      const minutes = parsedTime.split(':')[1];
      this.generateTimeOptions(minutes);
      if (event.originalEvent.type !== 'input') {
        this.selectedTime = {
          label: parsedTime,
          value: parsedTime,
        };
      }

      // Thông báo lên FormControl (luồng: Component → FormControl)
      this.onChange(parsedTime);
      this.onTouched();
    }
  }

  // Parse time input in various formats
  parseTimeInput(input: string): string | null {
    if (!input) return null;

    // If already in HH:mm format, validate and return
    if (/^\d{2}:\d{2}$/.test(input)) {
      const parts = input.split(':');
      const hoursNum = parseInt(parts[0], 10);
      const minutesNum = parseInt(parts[1], 10);

      if (
        hoursNum >= 0 &&
        hoursNum < 24 &&
        minutesNum >= 0 &&
        minutesNum < 60
      ) {
        return input;
      }
    }

    // Remove any non-digit characters
    const digitsOnly = input.replace(/\D/g, '');

    // Handle different input lengths
    if (digitsOnly.length === 3) {
      // Format: Hmm (e.g., 930 -> 09:30)
      const hours = digitsOnly.substring(0, 1).padStart(2, '0');
      const minutes = digitsOnly.substring(1, 3);

      const hoursNum = parseInt(hours, 10);
      const minutesNum = parseInt(minutes, 10);

      if (
        hoursNum >= 0 &&
        hoursNum < 24 &&
        minutesNum >= 0 &&
        minutesNum < 60
      ) {
        return `${hours}:${minutes}`;
      }
    } else if (digitsOnly.length === 4) {
      // Format: HHmm (e.g., 1100 -> 11:00, 1430 -> 14:30)
      const hours = digitsOnly.substring(0, 2);
      const minutes = digitsOnly.substring(2, 4);

      const hoursNum = parseInt(hours, 10);
      const minutesNum = parseInt(minutes, 10);

      if (
        hoursNum >= 0 &&
        hoursNum < 24 &&
        minutesNum >= 0 &&
        minutesNum < 60
      ) {
        return `${hours}:${minutes}`;
      }
    } else if (digitsOnly.length === 1 || digitsOnly.length === 2) {
      // Format: H or HH (e.g., 9 -> 09:00, 11 -> 11:00)
      const hours = digitsOnly.padStart(2, '0');
      const hoursNum = parseInt(hours, 10);

      if (hoursNum >= 0 && hoursNum < 24) {
        return `${hours}:00`;
      }
    }

    return null;
  }

  // Handle clear
  onClear() {
    this.selectedTime = null;
    this.onChange(null);
    this.onTouched();
    this.cdr.markForCheck();
  }
}
