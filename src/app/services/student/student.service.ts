
 import { Injectable } from '@angular/core';

 @Injectable()
 export class StudentService {

   constructor() { }

   // Get all students list via API or any data storage
   getAllStudents(){
     let studentList:any;
     if(localStorage.getItem('students') && localStorage.getItem('students') != '') {
       studentList = {
         code : 200,
         message : "Students List Fetched Successfully",
         data : JSON.parse(localStorage.getItem('students'))
       }
     }else{
       studentList = {
         code : 200,
         message : "Students List Fetched Successfully",
         data : JSON.parse(localStorage.getItem('students'))
       }
     }
     return studentList;
   }

   doRegisterStudent(data, index){
     let studentList = JSON.parse(localStorage.getItem('students'));
     let returnData;
     
     console.log("index", index);
     
     if(index != null) {

       studentList[index] = data;
       localStorage.setItem('students',JSON.stringify(studentList));
       returnData = {
         code : 200,
         message : "Student Successfully Updated",
         data : JSON.parse(localStorage.getItem('students'))
       }    
     }else{      
       data.id = this.generateRandomID();
       for (var i = 0; i < studentList.length; i++) {
         if (studentList[i].Roll_No == data.Roll_No) {
           returnData = {
             code : 503,
             message : "This Roll_No is already Register",
             data : null
           }    
           return returnData;
         }
       }
       studentList.unshift(data);

       localStorage.setItem('students',JSON.stringify(studentList));

       returnData = {
         code : 200,
         message : "Student Successfully Added",
         data : JSON.parse(localStorage.getItem('students'))
       }    
     }
     return returnData;
   }
  
   doStudentSearching(data){
    let studentList = JSON.parse(localStorage.getItem('students'));
    let returnData;
    for (var i = 0; i < studentList.length; i++) {
      if (studentList[i].Roll_No == data.Roll_No && studentList[i].Name == data.Name) {
        returnData = {
          code : 200,
          message : "Student fetched Successfully",
          data : i
        }  
        return returnData;

    }
   }
   returnData = {
    code : 404,
    message : "Incorrect Details",
    data : null
  }    
  return returnData;
}

   deleteStudent(index:number){
     let studentList = JSON.parse(localStorage.getItem('students'));

     studentList.splice(index, 1);

     localStorage.setItem('students',JSON.stringify(studentList));

     let returnData = {
       code : 200,
       message : "Student Successfully Deleted",
       data : JSON.parse(localStorage.getItem('students'))
     }

     return returnData;
   }



   getStudentDetails(index:number){
     let studentList = JSON.parse(localStorage.getItem('students'));

     let returnData = {
       code : 200,
       message : "Student Details Fetched",
       studentData : studentList[index]
     }

     return returnData;
   }


   generateRandomID() {
     var x = Math.floor((Math.random() * Math.random() * 9999));
     return x;
   }

 }
