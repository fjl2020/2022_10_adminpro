import { Component, OnInit } from '@angular/core';
import { SliderbarService } from '../../services/sliderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems:any[]=[]
  constructor(private slideSvc:SliderbarService) {
    this.menuItems=this.slideSvc.menu
  }

  ngOnInit(): void {
    
    
  
  }

}
