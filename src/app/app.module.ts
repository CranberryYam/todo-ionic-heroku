import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChecklistPage } from '../pages/checklist/checklist';
import { Data } from '../providers/data.ts';
import { IonicStorageModule } from '@ionic/storage';

import { AddCardComponent } from '../components/addcard';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChecklistPage,
    AddCardComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChecklistPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    Data
  ]
})
export class AppModule {}
