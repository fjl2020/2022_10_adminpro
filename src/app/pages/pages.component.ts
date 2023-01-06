import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SliderbarService } from '../services/sliderbar.service';

declare function customInitFunction():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsSvc:SettingsService,
    private sidebarSvc:SliderbarService) {
   }

  ngOnInit(): void {
    this.sidebarSvc.cargarMenu();
    customInitFunction();
  }

}
