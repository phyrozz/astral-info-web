import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanArtworkPreviewComponent } from './fan-artwork-preview.component';

describe('FanArtworkPreviewComponent', () => {
  let component: FanArtworkPreviewComponent;
  let fixture: ComponentFixture<FanArtworkPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanArtworkPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanArtworkPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
