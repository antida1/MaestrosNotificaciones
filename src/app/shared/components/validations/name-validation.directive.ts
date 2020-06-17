import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import validator from 'validator';

@Directive({
  selector: '[nameValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NameValidationDirective, multi: true }]
})
export class NameValidationDirective implements Validator {

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const name = <string>control.value;
    const onlyLetters = /[A-Za-z]/;

    if (/[A-Za-z]/.test(name)) {

      return { 'nameValidation': { 'message': 'El nombre solo debe contener letras' } }
    }

    return null;
  }


  constructor() { }

}
