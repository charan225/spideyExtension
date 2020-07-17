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
  available_schemas: any;

  urlLink: any;
  constructor(private jobDetailsService: JobDetailsService) {}
  loader: any;

  ngOnInit() {
    this.displayText = "No Schema available";
    this.displayImage = "../../../assets/noSchema.png";

    this.loader = true;
    this.noSchemasAvailable = false;
    this.available_schemas = true;

    // // For extension
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      this.urlLink = tabs[0].url;
      console.log("URL ", this.urlLink);

      this.jobDetailsService.getAvSchemas(this.urlLink).subscribe(
        (post: any) => {
          let jobStatusId = post;
          let job_id = {
            job_id: jobStatusId.job_id,
          };
          console.log("avg schemas 7", post);
          this.startSchemaJob(job_id);
        },
        (error: any) => {
          console.log("Available Schema Failed");
        }
      );
    });

    // // For localhost
    // this.jobDetailsService.getAvSchemas().subscribe(
    //   (post: any) => {
    //     let jobStatusId = post;
    //     let job_id = {
    //       job_id: jobStatusId.job_id,
    //     };
    //     console.log("avg schemas 7", post);
    //     this.startSchemaJob(job_id);
    //   },
    //   (error: any) => {
    //     console.log("Available Schema Failed");
    //   }
    // );
  }

  startSchemaJob = (job_id) => {
    this.jobInterval = setInterval(() => {
      this.jobDetailsService.startSchemaJob(job_id).subscribe(
        (posts: any) => {
          this.schemaData = posts;
          console.log(this.schemaData, "this.schemaData 1");

          if (this.schemaData.status == "SUCCESS") {
            this.loader = false;
            document.getElementById("available_schemas").click();

            this.showSchemaObj = this.schemaData.data.schemas;
            console.log("showSchemaObj", this.showSchemaObj, this.schemaData);
            if (this.showSchemaObj.length == 0) {
              console.log("Data is not available for this url");
              this.noSchemasAvailable = true;
              this.available_schemas = false;
            } else {
              this.showTable = true;
              this.showNewSchemaWindow = false;
              this.keys = this.showSchemaObj.columns;
              this.showSchemaData(0);
              console.log("clear interval called7");
            }
            clearInterval(this.jobInterval);
          } else if (this.schemaData.status == "FAILURE") {
            console.log("clear interval called failed7");
            this.loader = false;
            clearInterval(this.jobInterval);
          }
        },
        (error: any) => {
          clearInterval(this.jobInterval);
          console.log("schema status failed");
        }
      );
    }, 1000);
  };

  showTableCheck = () => {
    return this.showTable;
  };

  showLoader = () => {
    return this.loader;
  };

  showFRE = () => {
    return this.noSchemasAvailable;
  };

  itemOnHover(index: number) {
    this.actualIndex = index;
  }

  itemOnLeave() {
    this.actualIndex = -1;
  }

  showSchemaData(index) {
    this.showSchemaObj = this.schemaData.data.schemas[index];
    console.log("showSchemaObj", this.schemaData.data.schemas[index].schema_id);
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
  organizaionType = [
    "System Integrator(SI)",
    "Managed Services Provider(MSP)",
    "Independent sofware vendor",
    "Reseller,Distributor,or Channel Developer",
  ];
  countriesOperatedByPartners = [
    "All",
    "United States",
    "Australia",
    "Canada",
    "United Kingdom",
  ];
  partnersOrgSize = [
    "1-10",
    "10-50",
    "50-250",
    "250-1000",
    "1k-5k",
    "5k-50k",
    "50k-100k",
  ];
  partnerSolAreas = [
    "All",
    "Server Migration",
    "Virtual Desktop",
    "Businees Applications",
    "Customer Engagement",
    "Scalable Business Management",
    "Unified Operations",
    "Power Platform",
    "Modern Workplace",
    "Unified Endpoint Management",
    "Security",
    "Teamwork",
    "Adoption and Change Management",
    "Compliance",
  ];
  partnerIndustries = [
    "All",
    "Analytics",
    "Education",
    "Distribution",
    "Financial Services",
    "Government",
    "Health",
    "Professional Services",
    "MAnufacturing",
  ];
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
