import { Component, OnInit } from '@angular/core';
import { PMService } from '../../pm/pm.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/models/Project';
 
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project> = [];
  constructor(
    private pmService: PMService,
  ) { }

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

}
