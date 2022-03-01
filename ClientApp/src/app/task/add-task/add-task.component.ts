import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  fb: FormGroup;
  event: EventEmitter<any>=new EventEmitter();

  constructor(private builder: FormBuilder,  private bsModalRef: BsModalRef,
    private taskService : TaskService, private toastr : ToastrService) {
      this.fb=this.builder.group({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      });
  }

  

  addTask(){


    this.taskService.addTask(this.fb.value).subscribe(data=>{
      console.log(data);
      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
        this.toastr.success("Record Save Successfully");
      }
    });
      
      
  }

  onClose(){
    this.bsModalRef.hide();
  }

  ngOnInit() {
  }

}
