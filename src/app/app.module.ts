import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';

import { NgxPanZoomModule } from 'ngx-panzoom';

import { QueryCommandItemsAnchorDirective } from './libs/directives/query-command-items-anchor.directive';

import { AppComponent } from './app.component';

import { QueryCommandService } from './libs/services/query-command.service';

import { BaseQueryCommand } from './components/query-commands/base-query-command.component';
import { ConfigQueryCommand } from './components/query-commands/config-query-command.component';
import { CorrefQueryCommand } from './components/query-commands/corref-query-command.component';
import { SelectQueryCommand } from './components/query-commands/select-query-command.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

import { metaReducers, reducers } from './libs/store/reducer';

@NgModule({
  imports: [
    BrowserModule,
    DragDropModule,
    FontAwesomeModule,
    FormsModule,
    NgxPanZoomModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  declarations: [
    AppComponent,
    BaseQueryCommand,
    ConfigQueryCommand,
    CorrefQueryCommand,
    QueryCommandItemsAnchorDirective,
    SelectQueryCommand,
    WorkspaceComponent,
  ],
  providers: [QueryCommandService],
  bootstrap: [AppComponent],
})
export class AppModule {}
