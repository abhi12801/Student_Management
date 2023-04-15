
 import { Component, OnInit } from '@angular/core';
 import {Validators, FormBuilder, FormGroup} from '@angular/forms';
 import { RouterModule, Routes ,Router,ActivatedRoute} from '@angular/router';

 // Services
 import { ValidationService } from '../../../services/config/config.service';
 import { StudentService } from '../../../services/student/student.service';
 import { routerTransition } from '../../../services/config/config.service';
 
 import { ToastrService } from 'ngx-toastr';

 @Component({
 	selector: 'app-student-add',
 	templateUrl: './student-add.component.html',
 	styleUrls: ['./student-add.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })

 export class StudentAddComponent implements OnInit {
 	// create studentAddForm of type FormGroup 
 	private studentAddForm : FormGroup;
 	index:any;

 	constructor(private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute, private studentService:StudentService,private toastr: ToastrService) { 

 		// Check for route params
 		this.route.params.subscribe(params => {
 			this.index = params['Roll_No'];
 			// check if ID exists in route & call update or add methods accordingly
 			if (this.index && this.index != null && this.index != undefined) {
 				this.getStudentDetails(this.index);
 			}else{
 				this.createForm(null);
 			}
 		});
 	}

 	ngOnInit() {
 	}

 	// Submit student details form
 	doRegister(){
		
		// if (this.index && this.index != null && this.index != undefined) {
		// 	this.studentAddForm.value.Roll_No = this.index
		// }else{
		// 	this.index = null;
		// }
 		let studentRegister = this.studentService.doRegisterStudent(this.studentAddForm.value, this.index);
 		if(studentRegister) {
 			if (studentRegister.code == 200) {
 				this.toastr.success(studentRegister.message,"Success");
 				this.router.navigate(['/']);
 			}else{
 				this.toastr.error(studentRegister.message,"Failed");
 			}
 		}
 	}

 	// If this is update form, get user details and update form
 	getStudentDetails(index:number){
 		let studentDetail = this.studentService.getStudentDetails(index);
 		this.createForm(studentDetail);
 	}

 	// If this is update request then auto fill form
 	createForm(data){
 		if (data == null) {
 			this.studentAddForm = this.formBuilder.group({
 				Roll_No: ['',  [Validators.required,Validators.maxLength(50)]],
 				Name: ['',  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
 				Date: ['',  [Validators.required]],
 				Score: ['',  [Validators.required]]
 			});			
 		}else{
 			this.studentAddForm = this.formBuilder.group({
 				Roll_No: [data.studentData.Roll_No,  [Validators.required,Validators.maxLength(50)]],
 				Name: [data.studentData.Name,  [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
 				Date: [data.studentData.Date,  [Validators.required]],
 				Score: [data.studentData.Score,  [Validators.required]]
 			});
 		}
 	}

 }

