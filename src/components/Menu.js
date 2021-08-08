import React from 'react';
import { Nav, NavItem, NavLink,Navbar} from 'reactstrap';
import { Link } from 'react-router-dom';


const Menu = (props) => {
  return (
    <div>
      <Navbar color="light" light expand="md">

      <Nav color="light" light expand="md">
         <NavItem>
          <NavLink> 
              <Link to={{
                    pathname: '/home',
                    state: [{id: 1, message: 'Welcome to Student Management App'}]
              }}> Home </Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink> <Link to="/add-student">Add New Student</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink> <Link  to="/view-student">View Students</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink> <Link  to="/find-student">Find Students</Link></NavLink>
        </NavItem>
      </Nav>

      </Navbar>
    </div>
  );
}

export default Menu;