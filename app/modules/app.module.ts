import '../misc/rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { KeysPipe } from '../shared/pipes/keys.pipe';

import { AppComponent } from '../components/app/app.component';
import { MenuComponent } from '../components/menu/menu.component';
import { LoginComponent } from '../components/login/login.component';

import { TaxonsComponent } from '../components/taxons/taxons.component';
import { TaxonListComponent } from '../components/taxon-list/taxon-list.component';
import { TaxonCardComponent } from '../components/taxon-card/taxon-card.component';
import { TaxonDetailsComponent } from '../components/taxon-details/taxon-details.component';
import { TaxonomicClassificationComponent } from '../components/taxonomic-classification/taxonomic-classification.component';


import { JobsComponent } from '../components/jobs/jobs.component';
import { JobsStatisticsComponent } from '../components/jobs-statistics/jobs-statistics.component';
import { JobReportsComponent } from '../components/job-reports/job-reports.component';
import { JobReportComponent } from '../components/job-report/job-report.component';
import { JobResultsComponent } from '../components/job-results/job-results.component';
import { JobExcerptComponent } from '../components/job-excerpt/job-excerpt.component';
import { JobActionsComponent } from '../components/job-actions/job-actions.component';
import { ConflictResolverComponent } from '../components/conflict-resolver/conflict-resolver.component';

import { PaginatorComponent } from '../components/paginator/paginator.component';
import { SearchComponent } from '../components/search/search.component';

import { AuthenticationGuard } from '../shared/authentication.guard';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/services/user.service';
import { TaxrefService } from '../shared/services/taxref.service';
import { JobService } from '../shared/services/job.service';
import { JobReportService } from '../shared/services/job-report.service';
import { EventService } from '../shared/services/event.service';

import '../styles/main.scss';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        KeysPipe,
        AppComponent,
        MenuComponent,
        LoginComponent,
        TaxonsComponent,
        TaxonListComponent,
        TaxonDetailsComponent,
        TaxonomicClassificationComponent,
        TaxonCardComponent,
        JobsComponent,
        JobsStatisticsComponent,
        JobReportsComponent,
        JobReportComponent,
        JobResultsComponent,
        JobExcerptComponent,
        JobActionsComponent,
        ConflictResolverComponent,
        PaginatorComponent,
        SearchComponent
    ],
    providers: [
        AuthenticationGuard,
        AuthenticationService,
        UserService,
        TaxrefService,
        JobService,
        JobReportService,
        EventService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
