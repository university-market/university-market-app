import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[selectedChip]'
})
export class SelectedChipDirective {
  
    private _bgColor = `#4c00ff`;
    private _textColor = `#ffffff`;

    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = this._bgColor;
        el.nativeElement.style.color = this._textColor;
    }
}