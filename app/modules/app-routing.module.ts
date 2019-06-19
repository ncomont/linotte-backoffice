import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../shared/authentication.guard';

import { LoginComponent } from '../components/login/login.component';
import { TaxonsComponent } from '../components/taxons/taxons.component';
import { TaxonDetailsComponent } from '../components/taxon-details/taxon-details.component';
import { JobsComponent } from '../components/jobs/jobs.component';
import { JobReportComponent } from '../components/job-report/job-report.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'taxons',
        pathMatch: 'full'
    },
    {
        path: 'taxons',
        component: TaxonsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'taxon-details/:id',
        component: TaxonDetailsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'jobs',
        component: JobsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'job-report/:id',
        component: JobReportComponent,
        canActivate: [AuthenticationGuard]
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routedComponents = [TaxonsComponent];
