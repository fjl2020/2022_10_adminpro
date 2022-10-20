import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  constructor(private settingsSvc:SettingsService) { }

  ngOnInit(): void {
    this.settingsSvc.checkCurrentTheme();

  }
  changeTheme(theme:string){
    this.settingsSvc.changeTheme(theme);
    this.settingsSvc.checkCurrentTheme();
    
  }
  
}
