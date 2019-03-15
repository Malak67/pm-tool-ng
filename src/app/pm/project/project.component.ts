import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PMService} from '../pm.service';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  pmForm: FormGroup;
  pmId: number;
  pm: any;
  updating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private pmService: PMService
  ) {
    this.createForm();
  }

  createForm() {
    this.pmForm = this.fb.group({
      name: ['', Validators.required ],
      company: ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pmId = +params['id'];
      this.pmService.retrieve(this.pmId)
      .subscribe(
        data => {
          console.log(data);
          if (data) {
            this.pm = data;
          }
        },
        error => {
          console.log(error);
        });
    });
  }

  onSubmit() {
    const pm = this.pmForm.value as Project;
    pm.id = this.pm.id;

    this.pmService.update(pm)
      .subscribe(
        data => {
          if (data) {
            this.pm = data;
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
    this.updating = !this.updating;
    this.pmForm.patchValue({
      name: this.pm.name,
      company: this.pm.company,
    });
  }

}
