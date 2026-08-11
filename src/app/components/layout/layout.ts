import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from 'src/app/components/navbar/navbar';

@Component({
  selector: 'tm-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
