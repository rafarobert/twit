import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
    styleUrls: []
})

export class HomeComponent implements OnInit {

    constructor(){

    }

    ngOnInit(){
        console.log('Se ha cargado el componente components.ts');
    }

}
