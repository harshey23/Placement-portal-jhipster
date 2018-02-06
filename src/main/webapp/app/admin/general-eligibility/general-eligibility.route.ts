import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { GeneralEligibalFormComponent } from './component/general-eligibal-form/general-eligibal-form.component';
import { GeneralEligibalListComponent } from './component/general-eligibal-list/general-eligibal-list.component';

export const generalElgibalRoute: Routes = [
    {
        path: 'general',
        component: GeneralEligibalFormComponent,
        data: {
            pageTitle: 'General Elgibility'
        }
    },
    {
        path: 'general/list',
        component: GeneralEligibalListComponent,
        data: {
            pageTitle: 'General Elgibility'
        }
    }
];
