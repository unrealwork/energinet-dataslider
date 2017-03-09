export interface Slider {
  toggleMenu(): void;
  toggle();
  goToSlide(num: number): void;
  goNextSlide(): void;
  goPreviousSlide(): void;
  goNextSection(): void;
  goPreviousSection(): void;
}
