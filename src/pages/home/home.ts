import { Component } from '@angular/core';
import { NavController, AlertController, Platform} from 'ionic-angular';
import { ChecklistModel } from '../../models/checklist-model'; // "../../" means the src folder
import { Data } from '../../providers/data';
import { ChecklistPage } from '../checklist/checklist'; // "../" means the pages folder
import { AddCardComponent } from '../../components/addcard';
import { AboutPage } from '../about/about';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
}
)
export class HomePage {
  checklists: ChecklistModel[] = [];

  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public dataService:Data,
  public platform:Platform) {
      
  }

  ionViewDidLoad() {
      this.platform.ready().then(()=>{
      
         this.dataService.getData().then((checklists)=>{
                let savedChecklists:any = false;
                console.log(checklists);
                if(typeof(checklists) != "undefined"){
                    savedChecklists = JSON.parse(checklists);
                }

                if(savedChecklists){
                    savedChecklists.forEach((savedChecklist) => {
                       let loadChecklist = new ChecklistModel(savedChecklist.title, savedChecklist.items, savedChecklist.image);
                       this.checklists.push(loadChecklist);
                       loadChecklist.checklistUpdates().subscribe((update)=>{
                          this.save();
                       });
                    });
                }
         });
      });
  }
  

  ionViewWillEnter() {
    console.log('enter');
      this.dataService.ChecklistAsDelete().then((data)=>{
               console.log(typeof(data));
               console.log(data);

                    this.checklists.forEach((checklist)=>{
                      if(checklist.title == data){
                          this.removeChecklist(checklist);
                      }
                    })
              
        });
  }

  save() {
      console.log('doing this.save()');
      this.dataService.save(this.checklists);
  }


  pushAddPage():void {
      this.navCtrl.push(AboutPage);
  }
  addChecklist():void {
      console.log('addChecklist');
      let prompt = this.alertCtrl.create({
      title: 'New Checklist',
      message: "Enter the name of the new checklist",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
            let index = Math.floor(Math.random() * 3) + 0;
            let imageArray = ['Abstract', 'Minimal', 'Purple', 'Shanghai'];
            let image = imageArray[index];
            let newChecklist = new ChecklistModel(data.title, [],image);
            this.checklists.push(newChecklist);
            console.log(this.checklists);
          
            newChecklist.checklistUpdates().subscribe(updates =>{
               console.log(updates);
               this.save();
            });
            this.save();
          }
        }
      ]
    });

    prompt.present();
  }



  renameChecklist(checklist):void {
      let prompt = this.alertCtrl.create({
      title: 'Change Name',
      message: "Enter the new name of the checklist",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
            let index = this.checklists.indexOf(checklist);
            if(index > -1){
                this.checklists[index].setTitle(data.title);
            }
          }
        }
      ]
    });

    prompt.present();
  }



  viewChecklist(checklist):void {
     this.navCtrl.push(ChecklistPage, {
       checklist:checklist
     });
  }


  removeChecklist(checklist):void {
     let index = this.checklists.indexOf(checklist);
     this.checklists.splice(index, 1);
     this.save();
  }

}
