/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeCursoPublicacaoListItemComponent } from './home-curso-publicacao-list-item.component';

describe('HomeCursoPublicacaoListItemComponent', () => {
  let component: HomeCursoPublicacaoListItemComponent;
  let fixture: ComponentFixture<HomeCursoPublicacaoListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCursoPublicacaoListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCursoPublicacaoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
