import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormService } from '../form.service'
import { FormGroup } from '@angular/forms';

import { UpdateComponent } from '../update/update.component'
import { DeleteComponent } from '../delete/delete.component'
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
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.item = data.item
    this.form =data.form
    this.myFormGroup = this.formService.loadFormGroup(this.form,this.item)

   }

  ngOnInit() {
      
  }

  update(item){
    this.formService.openUpdate(this.resource,item,UpdateComponent)
      
  }

  delete(item){
    this.formService.openDelete(this.resource,item,DeleteComponent)
  }

}
