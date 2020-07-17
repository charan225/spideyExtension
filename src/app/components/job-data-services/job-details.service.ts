import { Injectable } from "@angular/core";
import { OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class JobDetailsService {
  jsonUrl;
  collectionData;
  collectionList;

  schemaData;
  jobListObj;
  jobIdStatus;
  schemajob_id;
  finalJob;
  currentUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUrl = environment.url;
    console.log("current Api url", this.currentUrl);
  }

  // // For extension
  // getAvSchemas(urlLink){
  //   console.log("avg schemas 1");
  //   console.log('available url', urlLink);

  //   let urlObj: object = {};
  //   urlObj['url'] = urlLink;
  //   this.jsonUrl = JSON.stringify(urlObj) ;

  //   return this.http.post(this.currentUrl + '/app/coreapi/getvalidschemas/',JSON.parse(this.jsonUrl))
  // }

  // // For Localhost
  getAvSchemas() {
    console.log("avg schemas 1");
    let urlObj: object = {};

    // urlObj["url"] = "https://www.riverisland.com/c/men/shirts";
    urlObj["url"] = "https://www.flipkart.com/";
    this.jsonUrl = JSON.stringify(urlObj);

    return this.http.post(
      this.currentUrl + "/app/coreapi/getvalidschemas/",
      JSON.parse(this.jsonUrl)
    );
  }

  startSchemaJob(job_id) {
    return this.http.post(this.currentUrl + "/app/coreapi/getstatus/", job_id);
  }
}
