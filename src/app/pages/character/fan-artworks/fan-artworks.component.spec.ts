import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanArtworksComponent } from './fan-artworks.component';

describe('FanArtworksComponent', () => {
  let component: FanArtworksComponent;
  let fixture: ComponentFixture<FanArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanArtworksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
