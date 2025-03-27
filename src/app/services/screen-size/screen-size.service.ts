import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSize = new BehaviorSubject<'mobile' | 'tablet' | 'desktop'>('desktop');

  constructor() {
    this.checkScreenSize();
    
    fromEvent(window, 'resize').subscribe(() => {
      this.checkScreenSize();
    });
  }

  private checkScreenSize(): void {
    const width = window.innerWidth;
    
    if (width < 768) {
      this.screenSize.next('mobile');
    } else if (width >= 768 && width < 1024) {
      this.screenSize.next('tablet');
    } else {
      this.screenSize.next('desktop');
    }
  }

  public getScreenSize(): Observable<'mobile' | 'tablet' | 'desktop'> {
    return this.screenSize.asObservable();
  }
}
