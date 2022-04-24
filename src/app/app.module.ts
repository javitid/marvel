import { CommonModule } from '@angular/common'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ErrorComponent } from '../components/error/error.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
import { HttpErrorInterceptor } from '../interceptors/http-error-interceptor';
import { TableComponent } from '../elements/table/table.component';
import { ChipsComponent } from '../elements/chips/chips.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogComponent } from '../elements/dialog/dialog.component';
import { CreateComponent } from '../elements/create/create.component';
import { GraphsComponent } from '../elements/graphs/graphs.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErrorComponent,
    PageNotFoundComponent,
    TableComponent,
    ChipsComponent,
    DialogComponent,
    CreateComponent,
    GraphsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
