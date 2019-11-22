import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ContentLoaderComponent } from './content-loader.component';
import { HotelListContentLoaderComponent } from './hotel-list-loader.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ContentLoaderComponent,
        HotelListContentLoaderComponent
    ],
    exports: [
        ContentLoaderComponent,
        HotelListContentLoaderComponent
    ]
})
export class ContentLoaderModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ContentLoaderModule
        };
    }
}