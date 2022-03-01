import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url=environment.apiUrl;
  productBrandIdData: any;

  constructor(private http: HttpClient ) {
   
   }

  //  getProductBrandAll(brandParam : ProductBrandParam){

  //   let params=  getPaginationHeaders(brandParam.pageNumber, brandParam.pageSize);
  //   params = params.append('name',brandParam.name);
  //   //params = params.append('orderBy',brandParam.orderBy);
  //   return getPaginationResult<ProductBrand[]>(this.url+'productBrand',params, this.http);
  //  }

  addTask(model: any) : Observable<any>{
    console.log(model);
    return this.http.post(this.url+'Task/AddTask',model);
  }


  getAllTask() :Observable<any> {
   return this.http.get<Task[]>(this.url + 'Task/GetAllTask');
  }
 

  getTaskByName(name:any) : Observable<any>{
    return this.http.get<Task[]>(this.url +'Task/searchTask/'+name);
  }


}
