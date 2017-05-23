import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {

  constructor(public storage:Storage) {
      
  }

  getData():Promise<any> {
    let loadData = this.storage.get('Checklists');
    console.log(loadData);
    return loadData;
  }
  
  save(data):void {
    let saveData = [];
    data.forEach((checklists)=>{
      saveData.push({
         title:checklists.title,
         items:checklists.items,
         image:checklists.image
      })
    });
    console.log(saveData);
    let newData = JSON.stringify(saveData);
    this.storage.set('Checklists', newData);
  }

  ChecklistForDelete(title:String):void {
     let saveData = {title:title};
     let newData = JSON.stringify(saveData);
     this.storage.set('theCheck',title);
  }
  ChecklistAsDelete():Promise<any> {
     let loadData = this.storage.get('theCheck');
     return loadData;
  }

}
