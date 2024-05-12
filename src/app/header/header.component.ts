import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input()
  title!: String;

  theme: any = {
    light: {
      icon: '/assets/icon-moon.svg',
      name: 'Dark Theme'
    },
    dark: {
      icon: '/assets/icon-sun.svg',
      name: 'Light Theme'
    }
  }

  themeToggleDefaults: any;
  userTheme!: string;

  constructor(@Inject(TodoService) private todoService: TodoService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // let userTheme = localStorage.getItem('theme');

    // if (userTheme === null) {
    //   localStorage.setItem('theme', 'light');
    //   userTheme = localStorage.getItem('theme');
    // }
    // this.themeToggleDefaults = this.theme[userTheme as string];
    this.todoService.getUserTheme().subscribe((value) => {
      this.themeToggleDefaults = this.theme[value];
      this.userTheme = value;
    });
  }

  onToggle() {
    // if (localStorage.getItem('theme') === 'light') {
    //   // this.themeToggleDefaults = this.theme['dark']
    //   // localStorage.setItem('theme', 'dark');
    // } else {
    //   this.themeToggleDefaults = this.theme['light']
    //   localStorage.setItem('theme', 'light');
    // }
    // this.todoService.getUserTheme().subscribe((value) => {
    //   this.themeToggleDefaults = this.theme[value];
    // });
    if (this.userTheme === 'light') {
      this.themeToggleDefaults = this.theme['dark'];
      this.todoService.setUserTheme('dark');
    } else {
      this.themeToggleDefaults = this.theme['light'];
      this.todoService.setUserTheme('light');
    }
    




  }

}
