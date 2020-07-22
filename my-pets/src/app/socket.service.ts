import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }


  public webSocket = new WebSocket('ws://localhost:6556')

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1OTU0MTM1MDF9.9NxLjgowzH5zVwxDdHMMEtznkgVWnvHVhQyEXviipMY";

  public sendSocket(resource) {


    const msg = {
      type: 'authenticate',
      payload: {
        token: this.token,
        room: resource,
        msg: "true"
      }
    };
    this.webSocket.send(JSON.stringify(msg));
  }

  public openSocket() {
    const msg = {
        type: 'authenticate',
        payload: { token: this.token }
      }
      this.webSocket.send(JSON.stringify(msg))
  }

  public joinSocket(resource){
    const msg = {
        type: 'authenticate',
        payload: { 
          token: this.token, 
          join: resource
        }
      }
    this.webSocket.send(JSON.stringify(msg))
  }

  public sendUpdateSocket(resource,id){
    this.sendSocket(resource)
    this.sendSocket(id)
  }

}
