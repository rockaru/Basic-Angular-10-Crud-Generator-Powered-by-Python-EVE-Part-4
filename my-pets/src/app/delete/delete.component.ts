import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormService } from '../form.service'
import { FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service'
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  info:string
  resource:string
  form:any=[]
  item:any=[]
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private socketService: SocketService,
    private dataService: DataService,
    private formService: FormService,
    private dialogRef: MatDialogRef<DeleteComponent>,
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
      const msg =`${this.item.name} este modificat in acest moment. Sigur stergeti?`
      this.loadData()
      this.info = msg
    })
    
  }

  loadData(){
   
      
    this.dataService.getOne(this.resource,this.item._id).subscribe(data=>{
      this.item=data
    })
  
  }

  delete(){
    this.dialogRef.close("delete");
  }

}
