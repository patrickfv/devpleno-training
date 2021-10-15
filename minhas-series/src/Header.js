import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
    Navbar, 
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Collapse,
    NavbarBrand } from 'reactstrap'
  
const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
      setIsOpen(!isOpen)
    }
  
    return (
      <div>
        <Navbar color='dark navbar-dark bg-dark' light expand='md'>
          <div className='container'>
            <NavbarBrand tag={Link} to='/'>Minhas Séries</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className='ml-auto' navbar >
                <NavItem>
                    <NavLink tag={Link} to='/series' >Séries</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/generos' >Genêros</NavLink>
                </NavItem>
                </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    )  
}

export default Header