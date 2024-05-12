import { Component, Inject, Renderer2 } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { DOCUMENT } from '@angular/common';
import { TodoService } from './services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    TodoItemsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo';

  currentThemeSubscription$!: Subscription;
  constructor(
    @Inject(TodoService) private todoService: TodoService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.currentThemeSubscription$ = this.todoService.getUserTheme()
      .subscribe((value) => {
        if (value == 'light') {
          this.renderer.removeClass(this.document.body, 'dark-theme');
          this.renderer.addClass(this.document.body, 'light-theme');
        } else {
          this.renderer.removeClass(this.document.body, 'light-theme');
          this.renderer.addClass(this.document.body, 'dark-theme');
        }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.currentThemeSubscription$.unsubscribe();
  }

}
