import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './BurgerMenu.scss';

class BurgerMenu extends Component {
  // showSettings(event) {
  //   event.preventDefault();
  //   console.log('clicked');
  // }

  // for custom Icon to toggle we need to do all this, or to add this Menu in bootstrap navbar.
  // React Burger menu options.
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };
  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  };
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
        >
          <a id="home" className="menu-item lead" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
          <a onClick={this.showSettings} className="menu-item--small" href="">
            Settings
          </a>
        </Menu>
      </div>
    );
  }
}

export default BurgerMenu;
