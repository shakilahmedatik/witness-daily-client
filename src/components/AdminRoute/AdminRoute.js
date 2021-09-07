/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from '../../App'

const AdminRoute = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.role === 1 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default AdminRoute
