import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../_service/project.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  projectForm: FormGroup;
  submitted = false;
  projectList: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder, private ps: ProjectService, private toastr: ToastrService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

    this.getProject();

    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      retrieve: true
    };

    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
    });
  }

  get f() { return this.projectForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.projectForm.invalid) {
      return;
    }
    else {
      this.ps.addProject(this.projectForm.value).subscribe(result => {
        this.getProject();
        console.log(result)
        this.projectForm.reset();
        this.showSuccess();
      }, error => {
        console.log(error)
      })
    }
  }
  getProject() {
    this.ps.getAllProjects().subscribe(result => {
      this.projectList = result;
      this.dtTrigger.next('');
    })
  }
  showSuccess() {
    this.toastr.success('Project added successfully', 'Success');
  }
  showDeleteMessage(){
    this.toastr.warning('Deleted successfully', 'Success');
  }
  onSelect(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.Id); // You get the Id of the selected item here
    this.ps.deleteProjectById(selectedItem.Id).subscribe(result => {
      this.getProject();
      this.showDeleteMessage();
      console.log(result)
    }, error => {
      console.log(error)
    })
  }
}
