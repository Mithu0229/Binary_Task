import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  searchfb: FormGroup;

  bsModalRef: BsModalRef | undefined;
  tasks : Task[]=[];
 
  isback=false;


  constructor(private builder: FormBuilder,private taskService :TaskService, 
    private bsModalService: BsModalService, private router: Router) {
      this.searchfb=this.builder.group({
        name: new FormControl('', [])
      });
     }

  ngOnInit(): void {
   
    this.loadTask();
  }
  loadTask(){
    
    this.taskService.getAllTask().subscribe(response =>{

      this.tasks =response;
    }, er=>{
  console.log(er,'error');
})
  }

  searchTask(){
 let name =this.searchfb.get('name')?.value;
 this.taskService.getTaskByName(name).subscribe(response =>{

  this.tasks =response;
}, er=>{
console.log(er,'error');
})

this.isback =true;
  }

  addTask() {
    this.bsModalRef = this.bsModalService.show(AddTaskComponent);
    this.bsModalRef.content.event.subscribe((result:any) => {
      //console.log("deleted", result);
      if (result === 'OK') {
        setTimeout(() => {
          this.loadTask();
        }, 100);
        
      }
    });
  }

 



  reloadTask(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
