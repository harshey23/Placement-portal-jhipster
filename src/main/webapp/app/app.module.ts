import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PlacementSharedModule, UserRouteAccessService } from './shared';
import { PlacementAppRoutingModule} from './app-routing.module';
import { PlacementHomeModule } from './home/home.module';
import { PlacementAdminModule } from './admin/admin.module';
import { PlacementAccountModule } from './account/account.module';
import { PlacementEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { AppComponent } from './app.component';

// jhipster-needle-angular-add-module-import JHipster will add new module here

 import {
//     JhiMainComponent,
     NavbarComponent,
//     FooterComponent,
     ProfileService,
//     PageRibbonComponent,
     ErrorComponent
 } from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PlacementAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        PlacementSharedModule,
        PlacementHomeModule,
        PlacementAdminModule,
        PlacementAccountModule,
        PlacementEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        // JhiMainComponent,
         NavbarComponent,
         ErrorComponent,
        // PageRibbonComponent,
        // FooterComponent,
        AppComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
        NgbActiveModal
    ],
    bootstrap: [ AppComponent ]
})
export class PlacementAppModule {}
