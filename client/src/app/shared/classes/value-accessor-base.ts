import {ControlValueAccessor} from '@angular/forms';

export class ValueAccessorBase<T> implements ControlValueAccessor {
  private _value: T;
  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();

  get value(): T {
    return this._value;
  }
  set value(value: T) {
    if (this._value !== value) {
      this._value = value;
      this.changed.forEach(f => f(value));
    }
  }

  touch() {
    this.touched.forEach(f => f());
  }

  writeValue(value: T) {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}
