import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem,NavDropdown, MenuItem } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import Flag from 'react-world-flags'

const T = i18n.createComponent();

const handleSelect =(eventKey)=> {
event.preventDefault();
switch (eventKey) {

  case 3.1:
    i18n.setLocale('hr-HR');
  break;

  case 3.2:
    i18n.setLocale('en-US');
  break;

  default:
    i18n.setLocale('en-US');
    break;
}
};

const PublicNavigation = () => (

  <Nav pullRight>
    <NavDropdown eventKey={3} title={<T>common.publicNav.Languages</T>} id="nav-dropdown" onSelect={handleSelect}>
      <MenuItem eventKey={3.1}><Flag code="hrv" height="12" /> Hrvatski</MenuItem>
      <MenuItem eventKey={3.2}><Flag code="usa" height="12" /> Engleski</MenuItem>
    </NavDropdown>
    <LinkContainer to="/signup">
      <NavItem eventKey={1} href="/signup"><T>common.publicNav.SignUp</T></NavItem>
    </LinkContainer>
    <LinkContainer to="/login">
      <NavItem eventKey={2} href="/login"><T>common.publicNav.Login</T></NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
