///<reference types="chrome"/>
import { Component, OnInit } from "@angular/core";
import { JobDetailsService } from "../job-data-services/job-details.service";
import { JobStatusId } from "src/app/models/apiInterfaces";

@Component({
  selector: "app-edit-schema",
  templateUrl: "./edit-schema.component.html",
  styleUrls: ["./edit-schema.component.css"],
})
export class EditSchemaComponent implements OnInit {
  schemaData: any;
  actualIndex: any;
  showSchemaObj: any;
  selectedUrl: any;
  schemaObj: any;
  schemaStatusData: any;
  collectionList;
  jobInterval;
  showTable: boolean = false;
  keys: any;
  schemaConfig;
  collectionData;
  finalCollectionList;
  selectedCollNameToAddUrls;
  selectedCollIdToAddUrls;
  showNewSchemaWindow;
  columnWithUrls;
  columnValue;
  columnKey;

  columnObj;
  hideNewSchemaButton: boolean = false;
  columnTypes = ["string", "Url"];
  selectedColumnType = "string";
  noSchemasAvailable: any;

  displayText: any;
  displayImage: any;
  displayErrorText: any;

  available_schemas: any;
  availableSchemaFailed: any;
  links: any;

  urlLink: any;
  constructor(private jobDetailsService: JobDetailsService) { }
  loader: any;

  ngOnInit() {
    this.displayText = "No schemas available for this page. Please try creating new schemas.";
    this.displayImage = "../../../assets/noSchema.png";

    this.displayErrorText =
      "We ran into a problem and couldn't load your schema. Please try again.";
    this.links = "https://dataextractor.io/tutorials/";

    this.loader = true;
    this.noSchemasAvailable = false;
    this.available_schemas = true;
    this.availableSchemaFailed = false;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      this.urlLink = tabs[0].url;

      this.jobDetailsService.getAvSchemas(this.urlLink).subscribe(
        (post: any) => {
          let jobStatusId = post;
          let job_id = {
            job_id: jobStatusId.job_id,
          };
          this.startSchemaJob(job_id);
        },
        (error: any) => {
          this.loader = false;
          this.availableSchemaFailed = true;
        }
      );
    });
  }

  startSchemaJob = (job_id) => {
    this.jobInterval = setInterval(() => {
      this.jobDetailsService.startSchemaJob(job_id).subscribe(
        (posts: any) => {
          this.schemaData = posts;

          if (this.schemaData.status == "SUCCESS") {
            this.loader = false;
            document.getElementById("available_schemas").click();

            this.showSchemaObj = this.schemaData.data.schemas;
            if (this.showSchemaObj.length == 0) {
              this.noSchemasAvailable = true;
              this.available_schemas = false;
            } else {
              this.showTable = true;
              this.showNewSchemaWindow = false;
              this.keys = this.showSchemaObj.columns;
              this.showSchemaData(0);
            }
            clearInterval(this.jobInterval);
          } else if (this.schemaData.status == "FAILURE") {
            this.loader = false;
            clearInterval(this.jobInterval);
          }
        },
        (error: any) => {
          clearInterval(this.jobInterval);
          this.loader = false;
          this.availableSchemaFailed = true;
        }
      );
    }, 1000);
  };

  itemOnHover(index: number) {
    this.actualIndex = index;
  }

  itemOnLeave() {
    this.actualIndex = -1;
  }

  showSchemaData(index) {
    this.showSchemaObj = this.schemaData.data.schemas[index];
    this.showTable = true;
    this.showNewSchemaWindow = false;
    this.keys = this.showSchemaObj.columns;
  }

  checkUrlColumn(key) {
    let isUrlColumn = false;
    if (this.schemaConfig) {
      this.schemaConfig.results.url_columns.map((data) => {
        if (key === data) {
          isUrlColumn = true;
        }
      });
    }
    return isUrlColumn;
  }

  createNewSchema() {
    this.showNewSchemaWindow = true;
    this.hideNewSchemaButton = true;
  }

  selectColl(collection) {
    this.selectedCollNameToAddUrls = collection.name;
    this.selectedCollIdToAddUrls = collection.id;
  }

  /*New schema ts*/
  showPreferenceCardDetails = false;
  prefMicrosoftTabActive = false;
  prefPartnersTabActive = false;
  prefCustomersTabActive = false;
  prefStatusTabActive = true;

  onClickingPreferenceHeader = function () {
    this.showPreferenceCardDetails = !this.showPreferenceCardDetails;
  };

  onPrefStatusTabClick = function () {
    this.prefMicrosoftTabActive = false;
    this.prefPartnersTabActive = false;
    this.prefCustomersTabActive = false;
    this.prefStatusTabActive = true;
  };

  onPrefMicrosoftTabClick = function () {
    this.prefMicrosoftTabActive = true;
    this.prefPartnersTabActive = false;
    this.prefCustomersTabActive = false;
    this.prefStatusTabActive = false;
  };

  onPrefCustomersTabClick = function () {
    this.prefMicrosoftTabActive = false;
    this.prefPartnersTabActive = false;
    this.prefCustomersTabActive = true;
    this.prefStatusTabActive = false;
  };

  selectType(type) {
    this.selectedColumnType = type;
  }
}
