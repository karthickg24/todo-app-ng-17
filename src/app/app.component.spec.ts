import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let todoServiceMock;
  beforeEach(async () => {

    //Mocking Function
    // todoServiceMock = jasmine.createSpyObj('TodoService',['getUserTheme']);

    // todoServiceMock.getUserTheme.and.returnValue('dark');
    // Mocking funtion that returns observable
    // Ref: https://stackoverflow.com/questions/72564303/angular-test-subscribe-is-not-a-function
    todoServiceMock = {
      getUserTheme: () => of('dark')
    }

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: TodoService,
          useValue: todoServiceMock
        },
        // Initiate Automatic Change Detection
        // Ref: https://angular.io/guide/testing-components-scenarios#automatic-change-detection
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'todo' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, todo-app');
  // });
});
