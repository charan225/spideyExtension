import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditSchemaComponent } from './components/edit-schema/edit-schema.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { FirstReviewExperienceComponent } from './components/first-review-experience/first-review-experience.component';
import { ErrorBannerComponent } from './components/error-banner/error-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    EditSchemaComponent,
    LoaderComponent,
    FirstReviewExperienceComponent,
    ErrorBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
