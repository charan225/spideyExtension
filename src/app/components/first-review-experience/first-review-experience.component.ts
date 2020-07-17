import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-first-review-experience",
  templateUrl: "./first-review-experience.component.html",
  styleUrls: ["./first-review-experience.component.css"],
})
export class FirstReviewExperienceComponent implements OnInit {
  @Input("displayText") displayText: string;
  @Input("displayImage") displayImage: string;

  constructor() {}

  ngOnInit(): void {
    // console.log(
    //   "Display text",
    //   this.displayText,
    //   "Display Image",
    //   this.displayImage
    // );
  }
}
