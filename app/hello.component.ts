import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `
  <h1>Hello {{name}}!</h1>
  <h2>{{description}}</h2>
  <p>{{company}}</p>
  <div>
  <ul>
    <li *ngFor="let lang of languages">{{lang}}</li>
  </ul>
  </div>
  `,
  styles: [`h1, h2 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
  @Input() description: string;
  @Input() company: string;
  @Input() languages: string[];

}
