import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(resource) {
    
     return this.httpClient.get(`api/${resource}`).pipe()
      
  }

  public getOne(resource,id){
    return this.httpClient.get(`api/${resource}/${id}`).pipe()
  }

  public add(resource, data): Promise<any> {
    return new Promise((resolve, reject) => {
    
    this.httpClient.post(`api/${resource}`, data).pipe().subscribe(data=>{
      resolve(console.log(data))
    })
  })
  }

  public update(resource,id,data): Promise<any> {
    return new Promise((resolve, reject) => {
    return this.httpClient.patch(`api/${resource}/${id}`,data).pipe().subscribe(data=>{
      resolve(console.log(data))
    })
  })
  }

  public delete(resource,id): Promise<any> {
    return new Promise((resolve, reject) => {
    return this.httpClient.delete(`api/${resource}/${id}`).pipe().subscribe(data=>{
      resolve(console.log(data))
    })
  })
  }

}


