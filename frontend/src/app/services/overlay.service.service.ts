import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class OverlayServiceService {
  private overlayVisibility = new BehaviorSubject<boolean>(false);
  overlayVisibility$ = this.overlayVisibility.asObservable();

  // private editOverlayVisibility = new BehaviorSubject<boolean>(false);
  // editOverlayVisibilityObservable = this.overlayVisibility.asObservable();


  showOverlay() {
    this.overlayVisibility.next(true);
  }

  hideOverlay() {
    this.overlayVisibility.next(false);
  }

  // showEditOverLay() {
  //   this.editOverlayVisibility.next(true)
  // }

  // hideEditOverlay() {
  //   this.editOverlayVisibility.next(false)
  // }
}
