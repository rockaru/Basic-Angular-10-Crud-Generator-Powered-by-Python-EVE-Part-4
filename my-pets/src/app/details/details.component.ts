import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormService } from '../form.service'
import { FormGroup } from '@angular/forms';

import { UpdateComponent } from '../update/update.component'
import { DeleteComponent } from '../delete/delete.component'
import { DataService } from '../data.service';
import { SocketService } from '../socket.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  resource:string
  form:any=[]
  item:any=[]
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private socketService: SocketService,
    private dataService: DataService,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.item = data.item
    this.form =data.form
    this.myFormGroup = this.formService.loadFormGroup(this.form,this.item)
    socketService.joinSocket(this.item._id)
   }

  ngOnInit() {
    this.socketService.webSocket.addEventListener("message",(ev)=>{
      this.loadData()
    })
  }

  loadData(){
    this.dataService.getOne(this.resource,this.item._id).subscribe(data=>{
      this.item=data
    })
  }

  update(item){
    this.formService.openUpdate(this.resource,item,UpdateComponent)
      
  }

  delete(item){
    this.formService.openDelete(this.resource,item,DeleteComponent)
  }

}
