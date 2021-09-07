/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './Header.css'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'

const Header = () => {
  let history = useHistory()
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const handleLogout = e => {
    e.preventDefault()
    setLoggedInUser({})
    history.push('/')
  }
  return (
    <Navbar
      className='sticky-top bg-light shadow'
      collapseOnSelect
      expand='lg'
      variant='light'
    >
      <div className='container'>
        <Navbar.Brand>
          <Link to='/'>
            <h3>WD</h3>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto items'>
            <Link className='p-2 menuItem' to='/'>
              Home
            </Link>
            <Link className='p-2 menuItem' to='/about'>
              About
            </Link>
            <Link className='p-2 menuItem' to='/contact'>
              Contact
            </Link>

            {loggedInUser.isSignedIn ? (
              <NavDropdown
                title={<i className='fas fa-user text-primary'></i>}
                id='basic-nav-dropdown'
              >
                {loggedInUser.role === 1 && (
                  <div>
                    <NavDropdown.Item href='#'>
                      <Link className='p-2 menuItem' to='/article/add'>
                        <i className='fas fa-plus'></i> Article
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#'>
                      <Link className='p-2 menuItem' to='/admin/add'>
                        <i className='fas fa-plus'></i> Admin
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                  </div>
                )}
                <NavDropdown.Item href='#action/3.4'>
                  <Link
                    onClick={handleLogout}
                    className='btn btn-primary'
                    to='/home'
                  >
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link className='btn btn-primary' to='/login'>
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Header
