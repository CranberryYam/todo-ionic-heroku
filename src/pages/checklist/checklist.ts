import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Data } from '../../providers/data';
//import { ChecklistModel } from '../../models/checklist-model';

@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html'
})
export class ChecklistPage {
  checklist:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public alertCtrl:AlertController, public dataService:Data) {
        console.log(this.navParams);
        this.checklist = this.navParams.get('checklist');
        console.log(this.checklist.backImage2);
        console.log(this.checklist);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChecklistPage');
  }
  removeChecklist(){
    this.dataService.ChecklistForDelete(this.checklist.title);
    this.navCtrl.pop();
  }
  renameChecklist(){
       let prompt = this.alertCtrl.create({
      title: 'Rename '+this.checklist.title,
      message: "New Name",
      inputs: [
        {
          name: 'title',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.checklist.setTitle(data.title);
          }
        }
      ]
    });

    prompt.present();
  }
  addItems():void {
      let prompt = this.alertCtrl.create({
      title: 'New Item in '+this.checklist.title,
      message: "Name",
      inputs: [
        {
          name: 'title',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.checklist.addItem(data.title);
            console.log(this.checklist);
          }
        }
      ]
    });

    prompt.present();
  }

  renameItems(item):void{
       let prompt = this.alertCtrl.create({
      title: 'Rename '+this.checklist.title,
      message: "Name",
      inputs: [
        {
          name: 'title',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.checklist.renameItem(item, data.title);
          }
        }
      ]
    });

    prompt.present();
  }
  removeItems(item):void{
    this.checklist.removeItem(item);
  }
  toggleItem(item):void{
    this.checklist.toggleItem(item);
  }
  uncheckItems():void{
    this.checklist.items.forEach((item) => {
       if(item.checked){
         this.checklist.toggleItem(item);
       }
    })
  }

}
