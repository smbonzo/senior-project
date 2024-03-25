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
  public currentUser: User | undefined;
  public name: string = '';


  constructor(
    public dialogRef: MatDialogRef<PortfolioEditComponent>,
    private formBuilder: FormBuilder,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
  ) {
    if (this.modalData.currentUser) {
      this.currentUser = this.modalData.user;
      this.name = this.modalData.user.firstName;
    }
  }

  ngOnInit() { 
    this.createForm();
  }

  /**
   * Creates the FormGroup either using the provided portfolio data or blank
   */
  createForm() {
    if(!this.currentUser){
      this.currentUser = User.makeEmpty()
    }
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
      skills: [this.currentUser.studentDetails?.skills],
    });
  }

  newSkill(): FormGroup {  
    return this.formBuilder.group({  
      skillName: ""
    })  
  }  

  addSkill() {
    if(this.currentUser){
      this.currentUser.studentDetails?.skills.push(Skill.makeEmpty());
    }
  }

  removeSkill(i:number) { 
    if(this.currentUser){
      this.currentUser.studentDetails?.skills.slice(i);
    }
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
      updateData.studentDetails.description = this.portfolioForm.get('description')!.value;
      updateData.studentDetails.university_id = this.portfolioForm.get('university_id')!.value;
      updateData.studentDetails.gpa = this.portfolioForm.get('gpa')!.value;
      updateData.studentDetails.school_year = this.portfolioForm.get('school_year')!.value;
      updateData.studentDetails.skills = this.portfolioForm.get('skills') as FormArray
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
