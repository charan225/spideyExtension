import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-error-banner",
  templateUrl: "./error-banner.component.html",
  styleUrls: ["./error-banner.component.css"],
})
export class ErrorBannerComponent implements OnInit {
  
  @Input("displayErrorText") displayErrorText: string;
  @Input("links") links: any;

  constructor() {}

  ngOnInit(): void {
  }
}
