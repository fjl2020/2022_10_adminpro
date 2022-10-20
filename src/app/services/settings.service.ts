import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public linkTheme=document.querySelector('#theme');
  
  constructor() {

    let url=localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    this.linkTheme?.setAttribute('href',url)
    
   }
   changeTheme(theme:string){
    const url  = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href',url)
    localStorage.setItem('theme',url)
    
  }
  checkCurrentTheme()
  {
    const links = document.querySelectorAll('.selector');
    links.forEach(el=>{
      el.classList.remove('working');
      const btnTheme=el.getAttribute('data-theme')
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css`
      const lnkTheme= this.linkTheme?.getAttribute('href')

      if (lnkTheme== btnThemeUrl) 
      {el.classList.add('working')}
      
    })
  }
}
