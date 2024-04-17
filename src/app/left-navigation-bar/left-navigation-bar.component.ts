import { Component } from '@angular/core';

@Component({
  selector: 'app-left-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './left-navigation-bar.component.html',
  styleUrl: './left-navigation-bar.component.css'
})
export class LeftNavigationBarComponent {
  public firstLinks = [
    {
      name: "Home",
      alt: "Home Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/home-light-icon.svg",
      active: true
    },
    {
      name: "Messages",
      alt: "Messages Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/messages-dark-icon.svg",
      active: false
    },
    {
      name: "Data Exchange",
      alt: "Data Exchange Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/data-exchange-dark-icon.svg",
      active: false
    },
  ]

  public secondLinks = [
    {
      name: "Recipient Forms",
      alt: "Recipient Forms Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/file-dark-icon.svg",
      active: false
    },
    {
      name: "Recipient Accounts",
      alt: "Recipient Accounts Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/users-dark-icon.svg",
      active: false
    },
    {
      name: "Reports",
      alt: "Reports Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/file-dark-icon.svg",
      active: false
    },
    {
      name: "Print Services",
      alt: "Print Services Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/printer-dark-icon.svg",
      active: false
    },
  ]

  public footerLinks = [
    {
      name: "Help Guides",
      alt: "Help Guides Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/help-dark-icon.svg",
      active: false
    },
    {
      name: "Settings",
      alt: "Settings Icon",
      url: "#0",
      iconPath: "../../assets/LeftNavigationBar/settings-dark-icon.svg",
      active: false
    }
  ]

}
