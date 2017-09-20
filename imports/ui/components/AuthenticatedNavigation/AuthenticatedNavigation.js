import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Flag from 'react-world-flags'

const T = i18n.createComponent();

const handleSelect =(eventKey)=> {
event.preventDefault();
switch (eventKey) {

  case 9.1:
    i18n.setLocale('hr-HR');
  break;

  case 9.2:
    i18n.setLocale('en-US');
  break;

  default:
    i18n.setLocale('en-US');
    break;
}
};

const AuthenticatedNavigation = ({ name }) => (
  <div>
    <Nav>

      <LinkContainer to="/dashboard">
      <NavItem eventKey={7} ><T>common.authNav.Dashboard</T></NavItem>
      </LinkContainer>

      <NavDropdown eventKey={8} title={<T>common.authNav.CodeList</T>} id="nav-dropdown">
        <LinkContainer to="/code-list">
          <MenuItem eventKey={8.1} href="/code-list"><T>common.authNav.ListCodes</T></MenuItem>
        </LinkContainer>
        <LinkContainer to="/code-list/add">
          <MenuItem eventKey={8.2}  href="/code-list/add"><T>common.authNav.AddCode</T></MenuItem>
        </LinkContainer>
      </NavDropdown>

      <NavDropdown eventKey={2} title={<T>common.authNav.Workers</T>} id="nav-dropdown">
        <LinkContainer to="/workers">
          <MenuItem eventKey={2.1} href="/workers"><T>common.authNav.ListWorkers</T></MenuItem>
        </LinkContainer>
        <LinkContainer to="/workers/add">
          <MenuItem eventKey={2.2}  href="/workers/add"><T>common.authNav.AddWorker</T></MenuItem>
        </LinkContainer>
      </NavDropdown>

      <NavDropdown eventKey={3} title={<T>common.authNav.Suppliers</T>} id="nav-dropdown">
        <LinkContainer to="/suppliers">
          <MenuItem eventKey={3.1} href="/suppliers"><T>common.authNav.ListSuppliers</T></MenuItem>
        </LinkContainer>
        <LinkContainer to="/suppliers/add">
          <MenuItem eventKey={3.2}  href="/suppliers/add"><T>common.authNav.AddSupplier</T></MenuItem>
        </LinkContainer>
      </NavDropdown>

      <NavDropdown eventKey={4} title={<T>common.authNav.Invoices</T>} id="nav-dropdown">
        <LinkContainer to="/invoices">
          <MenuItem eventKey={4.1} href="/invoices"><T>common.authNav.ListInvoices</T></MenuItem>
        </LinkContainer>
        <LinkContainer to="/invoices/add">
          <MenuItem eventKey={4.2}  href="/invoices/add"><T>common.authNav.AddInvoice</T></MenuItem>
        </LinkContainer>
      </NavDropdown>

      <NavDropdown eventKey={5} title={<T>common.authNav.Articles</T>} id="nav-dropdown">
        <LinkContainer to="/articles">
          <MenuItem eventKey={5.1} href="/articles"><T>common.authNav.ListArticles</T></MenuItem>
        </LinkContainer>
        <LinkContainer to="/articles/add">
          <MenuItem eventKey={5.2}  href="/articles/add"><T>common.authNav.AddArticle</T></MenuItem>
        </LinkContainer>
      </NavDropdown>

      <NavDropdown eventKey={6} title={<T>common.authNav.Storages</T>} id="nav-dropdown">
        <LinkContainer to="/storages">
          <MenuItem eventKey={6.1} href="/storages"><T>common.authNav.ListStorages</T></MenuItem>
        </LinkContainer>
        <LinkContainer to="/storages/add">
          <MenuItem eventKey={6.2}  href="/storages/add"><T>common.authNav.AddStorage</T></MenuItem>
        </LinkContainer>
      </NavDropdown>


    </Nav>
    <Nav pullRight>

      <NavDropdown eventKey={9} title={<T>common.publicNav.Languages</T>} id="nav-dropdown" onSelect={handleSelect}>
        <MenuItem eventKey={9.1}><Flag code="hrv" height="12" /> Hrvatski</MenuItem>
        <MenuItem eventKey={9.2}><Flag code="usa" height="12" /> Engleski</MenuItem>
      </NavDropdown>

      <NavDropdown eventKey={1} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={1.1} href="/profile"><T>common.authNav.Profile</T></NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={1.2} onClick={() => Meteor.logout()}><T>common.authNav.Logout</T></MenuItem>
      </NavDropdown>

    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AuthenticatedNavigation;
