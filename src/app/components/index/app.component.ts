
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {
	title = 'Result Management By Sangwin Gawande';

	// Add few students for initial listing
	studentsList = [
	{	
		Roll_No : 1,
		Name : "Harsh",
		Date : "12-08-2001",
		Score : 500
		
	},
	{
		Roll_No : 2,
		Name : "puru",
		Date : "12-08-2001",
		Score : 510
	},
	{
		Roll_No : 3,
		Name : "Aniket",
		Date : "12-08-2001",
		Score : 550
	},
	{
		Roll_No : 4,
		Name : "Aagam",
		Date : "12-08-2001",
		Score : 200
	},
	{
		Roll_No : 5,
		Name : "Sunny",
		Date : "12-08-2001",
		Score : 600
	}
	];

	constructor() {
		// Save students to localStorage
		localStorage.setItem('students', JSON.stringify(this.studentsList));
	}
}

