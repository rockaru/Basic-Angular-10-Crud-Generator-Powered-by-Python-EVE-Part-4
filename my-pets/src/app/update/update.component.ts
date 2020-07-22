import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormService } from '../form.service'
import { FormGroup } from '@angular/forms';
import { SocketService } from '../socket.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  info:string
  resource:string
  form:any=[]
  item:any=[]
  id:string
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private socketService:SocketService,
    private dataService:DataService,
    private formService: FormService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.item = data.item
    this.form =data.form
    this.myFormGroup = this.formService.loadFormGroup(this.form,this.item)
    socketService.joinSocket(this.item._id)
    

   }

  ngOnInit() {
    this.info=""
    this.socketService.webSocket.addEventListener("message",(ev)=>{
      this.info =`${this.item.name} este modificat in acest moment.`
      this.loadData()
    })
  }

  loadData(){
    this.dataService.getOne(this.resource,this.item._id).subscribe(data=>{
      this.item=data
    })
  }

  save(){
    this.dialogRef.close(this.myFormGroup.value);
  }

}
