import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormService } from '../form.service'
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  form:any=[]
  item:any=[]
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private formService: FormService,
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.item = data.item
    this.form =data.form
    this.myFormGroup = this.formService.loadFormGroup(this.form,this.item)

   }

  ngOnInit() {
      
  }

  delete(){
    this.dialogRef.close("delete");
  }

}
