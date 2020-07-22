import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create/create.component';
import { DataService } from './data.service'
import { FormService } from './form.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-pets';

  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private formService: FormService,
    )
  {}

  read(resource){
    this.formService.openRead(resource,ReadComponent)
  }

  create(resource){
    this.formService.openCreate(resource,CreateComponent)

  }

}
