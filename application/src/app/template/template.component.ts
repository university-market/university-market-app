import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  template: `
   <p>
  		template Works!
   </p>
  `,
  styles: []
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
