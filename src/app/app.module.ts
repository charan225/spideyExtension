import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditSchemaComponent } from './components/edit-schema/edit-schema.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { FirstReviewExperienceComponent } from './components/first-review-experience/first-review-experience.component';

@NgModule({
  declarations: [
    AppComponent,
    EditSchemaComponent,
    LoaderComponent,
    FirstReviewExperienceComponent
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
