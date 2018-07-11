import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'app';

  public ngOnInit(): void {
    let config = {
      apiKey: "AIzaSyCvGbF8y_82ZqGvfD4RVMe2fk7Fry2uCGE",
      authDomain: "jta-instagram-clone-a3be7.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-a3be7.firebaseio.com",
      projectId: "jta-instagram-clone-a3be7",
      storageBucket: "jta-instagram-clone-a3be7.appspot.com",
      messagingSenderId: "473076432196"
    };
    firebase.initializeApp(config);
  }
}
