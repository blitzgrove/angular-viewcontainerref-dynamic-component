import { Component, ViewContainerRef, ComponentFactoryResolver, Injector, ViewChild, TemplateRef, AfterViewInit, OnDestroy, ComponentRef, EmbeddedViewRef } from '@angular/core';

// https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d
// https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e

import { HelloComponent } from './hello.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements AfterViewInit, OnDestroy  {
  name = 'Angular 5';
  description = 'Powerful JS Frontend Framework';
  company = 'Google';
  languages = [
    'java', 'javascript', 'scala', 'nodejs', 'C#', 'ruby', 'python'
  ];

  @ViewChild("vcr", { read: ViewContainerRef })
  vcr: ViewContainerRef;

  @ViewChild("helloContainer", { read: ViewContainerRef })
  helloContainer: ViewContainerRef;

  @ViewChild("tpl")
  tpl: TemplateRef<any>;

  @ViewChild("tpl2")
  tpl2: TemplateRef<any>;

  view: EmbeddedViewRef<any>;
  view2: EmbeddedViewRef<any>;

  componentRef: ComponentRef<any>;

  constructor(private r: ComponentFactoryResolver)   {
  }

  ngAfterViewInit() {
    this.view = this.tpl.createEmbeddedView(null); 
    this.view2 = this.tpl2.createEmbeddedView(null);
    this.vcr.insert(this.view);
    this.vcr.insert(this.view2);

    const factory = this.r.resolveComponentFactory(HelloComponent);
    this.componentRef = this.helloContainer.createComponent(factory);
    this.componentRef.instance.name = this.name;
    this.componentRef.instance.description = this.description;
    this.componentRef.instance.company = this.company;
    this.componentRef.instance.languages = this.languages;
    this.componentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    if (this.view) {
      this.view.destroy();
    }
    if (this.view2) {
      this.view2.destroy();
    }
  }
}
