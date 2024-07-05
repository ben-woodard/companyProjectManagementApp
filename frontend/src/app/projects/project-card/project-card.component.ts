import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/interfaces/Project';
import { ProjectsServiceService } from 'src/app/services/projects.service.service';
import { OverlayServiceService } from '../../services/overlay.service.service';
import { Team } from 'src/app/interfaces/Team';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project : Project | undefined = undefined;
  @Output() projectUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() editProject: EventEmitter<Project> = new EventEmitter<Project>();

  constructor(private projectService : ProjectsServiceService,
    private overlayService : OverlayServiceService
  ){}



onEditClick(project: Project) {
  if(project){
     this.editProject.emit(project);
  }
  this.overlayService.showOverlay()

}

  openOverlay() {
    this.overlayService.showOverlay();
  }


  updateProject() {
    this.projectUpdated.emit()
  }


}
