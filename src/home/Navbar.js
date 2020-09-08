import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Button,
  Nav,
  Collapse,
} from "reactstrap";
import BeerCreate from "../Beers/BeerCreate";
import AllPosts from "../Beers/AllPosts";
import MyPosts from "../Beers/MyPosts";
import { Route, Link, Switch } from "react-router-dom";
import APIURL from '../helpers/enviornments'

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  return (
    <>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/"><h4>Draft List</h4></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button onClick={props.clickLogout}>Logout</Button>
            </NavItem>
            <NavItem>
            <Button> <Link className="text-white"  to="/allposts">All Posts</Link> </Button> 
            </NavItem>
            <NavItem>
            <Button> <Link className="text-white" to="/myposts">My Posts</Link> </Button> 
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Sitebar;
