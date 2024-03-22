import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from "../../security/domain/user";
import { Endpoints, constructBackendRequest } from 'src/app/util/http-helper';


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
  ) {}

  ngOnInit() { 
    this.createForm();
  }

  /**
   * Creates the FormGroup either using the provided portfolio data or blank
   */
  createForm() {
    this.portfolioForm = this.formBuilder.group({
      name: [null],
      preferredName: [null],
      description: [null],
      email: [null],
      phone: [null],
      linkedIn: [null],
    });
  }


  addSkill() {  
    // this.quantities().push(this.newQuantity());  
  }  

  removeSkill(i:number) {  
    // this.quantities().removeAt(i);  
  }  

  closeModal() {
    this.dialogRef.close();
  }

  /**
   * Takes portfolio data from the form and sends the POST request to update the portfolio data
   */
  savePortfolio() {
    if (this.currentUser) {
      const updateData: any = {};

      updateData.id = this.currentUser.id as unknown as number;

      // these are required arguments, also assumed to already exist on the portfolio page
      updateData.name = this.portfolioForm.get('name')!.value;
      updateData.preferredName = this.portfolioForm.get('preferredName')!.value;
      updateData.description = this.portfolioForm.get('description')!.value;
      updateData.email = this.portfolioForm.get('email')!.value;
      updateData.phone = this.portfolioForm.get('phone')!.value;
      updateData.linkedin = this.portfolioForm.get('linkedin')!.value;
      updateData.studentDetails.university_id = this.portfolioForm.get('university_id')!.value;
      updateData.studentDetails.gpa = this.portfolioForm.get('gpa')!.value;
      updateData.studentDetails.school_year = this.portfolioForm.get('school_year')!.value;

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
}
