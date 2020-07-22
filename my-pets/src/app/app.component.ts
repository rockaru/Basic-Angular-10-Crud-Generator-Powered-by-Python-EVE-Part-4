import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create/create.component';
import { DataService } from './data.service'
import { FormService } from './form.service'
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-pets';
  live: string

  constructor(
    private socketService:SocketService,
    private dataService: DataService,
    private formService: FormService,
  ) {

    this.socketService.webSocket.addEventListener("open",()=>{
      this.socketService.openSocket()
    this.live="connected"

    })

  }

  ngOnInit() {
    
   

    this.socketService.webSocket.addEventListener("close",(e)=>{
      if(window.confirm("Disconected, please refresh.")){
        window.location.reload()
      }else{
        this.live="disconected"

      }

    })

    this.socketService.webSocket.addEventListener("error",(e)=>{
      alert(`Server error, please refresh. ${e}`)
    this.live="disconected"
    this.socketService.openSocket()
    })

  }

  read(resource) {
    this.formService.openRead(resource, ReadComponent)
  }

  create(resource) {
    this.formService.openCreate(resource, CreateComponent)

  }

}
