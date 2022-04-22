import { ComponentFixture, TestBed } from '@angular/core/testing';

import { chartsDataMock, superheroesMock } from './graphs.component.mock';
import { GraphsService } from '../../../services/graphs.service';
import { GraphsComponent } from '../graphs.component';

const spies = {
  getChartsData: jasmine.createSpy('getChartsData').and.returnValue(chartsDataMock),
}

interface Ctx {
  component: GraphsComponent;
  fixture: ComponentFixture<GraphsComponent>;
  graphsService: GraphsService;
}

// Force to run only this UT because it's the only one that it has been implemented
fdescribe('GraphsComponent', () => {
  beforeEach(async function (this: Ctx) {
    await TestBed.configureTestingModule({
      declarations: [ GraphsComponent ],
      providers: [
        { provide: GraphsService, useValue: spies }
      ]
    })
    .overrideTemplate(GraphsComponent, '')
    .compileComponents();

    this.graphsService = TestBed.inject(GraphsService);
    this.fixture = TestBed.createComponent(GraphsComponent);
    this.component = this.fixture.componentInstance;
    this.component.superheroes = superheroesMock;
    this.fixture.detectChanges();
  });

  describe('onInit', () => {
    it('should create', function(this: Ctx): void {
      expect(this.component).toBeTruthy();
    });

    it('should set chartsMap', function(this: Ctx): void {
      expect(this.component.chartsMap).toBe(chartsDataMock);
    });
  });
});
