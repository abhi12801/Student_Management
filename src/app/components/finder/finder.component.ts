import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
 import { RouterModule, Routes ,Router,ActivatedRoute} from '@angular/router';
 import { ToastrService } from 'ngx-toastr';
 import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {

  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute,private studentService:StudentService) { }

  ngOnInit() {
  }

  SearchForm = new FormGroup({
    Roll_No: new FormControl(""),
    Name:new FormControl("")
  });

  Searching(){
    console.log(this.SearchForm.value.Name);
    let studentSearching = this.studentService.doStudentSearching(this.SearchForm.value);
 		if(studentSearching)
    {
 			if(studentSearching.code == 200) 
      {
        console.log("data",studentSearching.data)
 				this.toastr.success(studentSearching.message,"Success");
        console.log(`/detail/${studentSearching.data}`);
 				this.router.navigate([`/detail/${studentSearching.data}`]);
 			}
      else
      {
 				this.toastr.error(studentSearching.message,"Failed");
 			}
 		}

}
};
