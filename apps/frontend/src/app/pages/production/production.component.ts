import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss'
})
export class ProductionComponent {
  streamUrl: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {
    // NOSONAR: The source is only available over HTTP
    this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://unity.flw.mb.tu-dortmund.de');
  }
}
