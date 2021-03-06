import { Component, OnInit, Inject } from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { CreateComponent } from '../create/create.component'
import { UpdateComponent } from '../update/update.component'
import { DeleteComponent } from '../delete/delete.component'
import { DetailsComponent } from '../details/details.component'
import { FormService } from '../form.service'
import { DataService } from '../data.service'
import { SocketService } from '../socket.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  resource:string
  form:any=[]
  items:any=[]

  constructor(
    private socketService: SocketService,
    private dataService: DataService,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.items = data.items
    this.resource = data.resource
    this.form =data.form
    socketService.joinSocket(this.resource)
  }

  ngOnInit() {
    this.socketService.webSocket.addEventListener("message",(ev)=>{
      this.loadData()
    })
  }

  loadData(){
    this.dataService.getAll(this.resource).subscribe(data=>{
      this.items=data["_items"]
    })
  }

  create(){
    this.formService.openCreate(this.resource,CreateComponent)
  }

  details(item){
    this.formService.openDetails(this.resource,item,DetailsComponent)
  }

  update(item){
    this.formService.openUpdate(this.resource,item,UpdateComponent)
      
  }

  delete(item){
    this.formService.openDelete(this.resource,item,DeleteComponent)
  }

}
