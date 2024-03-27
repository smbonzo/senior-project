import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from "../../security/domain/user";
import { Endpoints, constructBackendRequest } from 'src/app/util/http-helper';
import { Skill } from 'src/domain/Skill';


@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.less']
})
@Injectable()
export class PortfolioEditComponent implements OnInit {

  portfolioForm!: FormGroup;
  public currentUser: User;
  public name: string = '';


  constructor(
    public dialogRef: MatDialogRef<PortfolioEditComponent>,
    private formBuilder: FormBuilder,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
  ) {
    if (this.modalData.user) {
      this.currentUser = this.modalData.user;
      this.name = this.modalData.user.firstName;
    } else {
      this.currentUser = User.makeEmpty();
    }
  }

  ngOnInit() { 
    this.createForm();
  }

  /**
   * Creates the FormGroup either using the provided portfolio data or blank
   */
  createForm() {
    console.log("BEFORE");
    this.portfolioForm = this.formBuilder.group({
      name: [this.currentUser.name],
      preferredName: [this.currentUser.preferredName],
      description: [this.currentUser.studentDetails?.description],
      email: [this.currentUser.email],
      phone: [this.currentUser.phoneNumber],
      linkedin: [this.currentUser.linkedin],
      university_id: [this.currentUser.studentDetails?.universityId],
      gpa: [this.currentUser.studentDetails?.gpa],
      school_year: [this.currentUser.studentDetails?.yearLevel],
      degreePrograms: this.formBuilder.array([]),
      skills: this.formBuilder.array([]),
      projects: this.formBuilder.array([]),
      jobs: this.formBuilder.array([]),
      clubs: this.formBuilder.array([]),
      interests: this.formBuilder.array([]),
    });
    this.currentUser.studentDetails?.degreePrograms.forEach((degreeProgram) => this.degreePrograms().push(this.formBuilder.group({
      name: degreeProgram.name,
    })));
    this.currentUser.studentDetails?.skills.forEach((skill) => this.skills().push(this.formBuilder.group({
      name: skill.name,
    })));
    this.currentUser.studentDetails?.projects.forEach((project) => this.projects().push(this.formBuilder.group({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    })));
    this.currentUser.studentDetails?.jobs.forEach((job) => this.jobs().push(this.formBuilder.group({
      name: job.name,
      description: job.description,
      startDate: job.startDate,
      endDate: job.endDate,
    })));
    this.currentUser.studentDetails?.clubs.forEach((club) => this.clubs().push(this.formBuilder.group({
      name: club.name,
      startDate: club.startDate,
      endDate: club.endDate,
    })));
    this.currentUser.studentDetails?.interests.forEach((interest) => this.interests().push(this.formBuilder.group({
      name: interest.name,
    })));
  }

  degreePrograms(): FormArray {
    return this.portfolioForm.get("degreePrograms") as FormArray
  }  

  newDegreeProgram(): FormGroup {
    return this.formBuilder.group({
      name: "",
    })  
  }  

  addDegreeProgram() {
      this.degreePrograms().push(this.newDegreeProgram());
  }

  removeDegreeProgram(i:number) {
      this.degreePrograms().removeAt(i);
  }

  skills(): FormArray {
    return this.portfolioForm.get("skills") as FormArray
  }  

  newSkill(): FormGroup {
    return this.formBuilder.group({
      name: "",
    })  
  }  

  addSkill() {
      this.skills().push(this.newSkill());
  }

  removeSkill(i:number) {
      this.skills().removeAt(i);
  }

  projects(): FormArray {
    return this.portfolioForm.get("projects") as FormArray
  }  

  newProject(): FormGroup {
    return this.formBuilder.group({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    })  
  }  

  addProject() {
      this.projects().push(this.newProject());
  }

  removeProject(i:number) {
      this.projects().removeAt(i);
  }

  jobs(): FormArray {
    return this.portfolioForm.get("jobs") as FormArray
  }  

  newJob(): FormGroup {
    return this.formBuilder.group({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    })  
  }  

  addJob() {
      this.jobs().push(this.newJob());
  }

  removeJob(i:number) {
      this.jobs().removeAt(i);
  }

  clubs(): FormArray {
    return this.portfolioForm.get("clubs") as FormArray
  }  

  newClub(): FormGroup {
    return this.formBuilder.group({
      name: "",
      startDate: "",
      endDate: "",
    })  
  }  

  addClub() {
      this.clubs().push(this.newClub());
  }

  removeClub(i:number) {
      this.clubs().removeAt(i);
  }

  interests(): FormArray {
    return this.portfolioForm.get("interests") as FormArray
  }  

  newInterest(): FormGroup {
    return this.formBuilder.group({  
      name: "",
    })  
  }  

  addInterest() {
      this.interests().push(this.newInterest());
  }

  removeInterest(i:number) {
      this.interests().removeAt(i);
  }

  closeModal() {
    this.dialogRef.close();
  }

  /**
   * Takes portfolio data from the form and sends the POST request to update the portfolio data
   */
  savePortfolio() {
    if(!this.currentUser){
      this.currentUser = User.makeEmpty()
    }

    const updateData: any = {};

    updateData.id = this.currentUser.id as unknown as number;
    
    if(this.currentUser.studentDetails){
      updateData.studentDetails = {
        description: this.portfolioForm.get('description')!.value,
        university_id: this.portfolioForm.get('university_id')!.value,
        gpa: this.portfolioForm.get('gpa')!.value,
        school_year: this.portfolioForm.get('school_year'),
        skills: this.skills().value,
      }
    }
    // these are required arguments, also assumed to already exist on the portfolio page
    updateData.name = this.portfolioForm.get('name')!.value;
    updateData.preferredName = this.portfolioForm.get('preferredName')!.value;
    updateData.email = this.portfolioForm.get('email')!.value;
    updateData.phone = this.portfolioForm.get('phone')!.value;
    updateData.linkedin = this.portfolioForm.get('linkedin')!.value;

    const url = constructBackendRequest(Endpoints.EDIT_PORTFOLIO);
    this.http.post(url, updateData).subscribe(data => {
      if (!data) {
        window.alert("Something went wrong saving the portfolio");
        return;
      }
      window.alert("Portfolio updated");
      //go back to regular portfolio page
    })
  }
}
