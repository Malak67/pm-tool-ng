import { Component, OnInit } from '@angular/core';
import { PMService } from '../pm.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/models/Project';
 
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  admin: boolean;
  pmForm: FormGroup;
  pm: any;
  projects: Array<Project> = [];
  adding: boolean = false;

  constructor(
    private pmService: PMService,
    private fb: FormBuilder,
  ) {
    this.admin = (localStorage.getItem('isAdmin') === 'true');
    this.createForm();
  }

  createForm() {
    this.pmForm = this.fb.group({
      name: ['', Validators.required ],
      company: ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.pmService.list()
    .subscribe(
      res => {
        if (res) {
          this.projects = res;
        }
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    const pm = this.pmForm.value as Project;
    this.pmService.create(pm)
      .subscribe(
        data => {
          if (data) {
            this.pm = data;
            this.projects.push(this.pm);
            this.toggleUpdate();
          }
        },
        error => console.log(error)
      );
  }

  reset() {
    this.pmForm.reset();
  }

  toggleUpdate() {
    this.reset();
    this.adding = !this.adding;
  }

  remove(project: Project) {
    if (project) {
      this.pmService.destroy(project)
      .subscribe(
        res => {
          this.projects = this.projects.filter(obj => obj !== project);
        },
        error => console.log(error)
      );
    }
  }

}
