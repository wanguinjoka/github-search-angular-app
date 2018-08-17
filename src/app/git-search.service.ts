import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment'
import { Profile } from './profile-class/profile';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

   private username='string';

profile:Profile;

  constructor(private http:HttpClient) {
    this.profile = new Profile("","","","");
    this.username ='wanguinjoka';
}

       profileRequest() {

        interface ApiResponse{
           name:string;
           url:string;
           bio:string;
           location:string;
           // public_repos:number;
           // followers:number;
           // following:number
        }

       let promise = new Promise((resolve,reject)=>{
         this.http.get<ApiResponse>(environment.apiUrl+this.username+environment.apiKey).toPromise().then(response=>{
           this.profile.name=response.name
           this.profile.url=response.url
           this.profile.bio=response.bio
           this.profile.location=response.location
           // this.profile.public_repos=response.public_repos
           // this.profile.followers=response.followers
           // this.profile.following=response.following

         resolve()
       },
          error =>{
            this.profile.name = "Unable to get user"
            reject(error)
          }
        )
        })
        return promise
        // }
        // updateProfile(username:string){
        //        this.username=username;
      }
}
