import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../services/overlay.service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FullUser } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/Project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({});
  isVisible: boolean = false;
  user: FullUser | null = null;

  @Input() project: Project | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.userService.userObservable.subscribe(user => this.user = user);
    if (!this.user) {
      this.router.navigate(['/'])
      return;
    }

    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      active: false
    })

    this.overlayService.overlayVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });

    if (this.project) {
      this.projectForm.patchValue({
        name: this.project.name,
        description: this.project.description,
        active: this.project.active
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.projectForm.patchValue({
        name: this.project.name,
        description: this.project.description,
        active: this.project.active
      })
    }

  }


  closeOverlay() {
    this.overlayService.hideOverlay()
    this.projectForm.reset()
  }

  saveProject() {

  }
}
