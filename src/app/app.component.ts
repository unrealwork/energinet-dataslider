import {Component} from '@angular/core';
import {Slider} from '../../server/slider.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements Slider {
  public isMenuHidden = true;

  toggle() {
  }

  goToSlide(num: number): void {
  }

  goNextSlide(): void {
  }

  goPreviousSlide(): void {
  }

  goNextSection(): void {
  }

  goPreviousSection(): void {
  }

  public toggleMenu(): void {
    this.isMenuHidden = !this.isMenuHidden;
  }
}
