/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import firebaseConfig from '../../firebase.config'
import './Login.css'
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router'

const Login = () => {
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  // Initialize Firebase
  initializeApp(firebaseConfig)
  const auth = getAuth()

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })
  const [newUser, setNewUser] = useState(false)

  //Handle Google Sign-In
  const googleProvider = new GoogleAuthProvider()
  const googleSignInHandle = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result)
        const { displayName, email } = result.user
        setUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          success: true,
        })
        setLoggedInUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          role: 0,
        })
        history.replace(from)
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = { ...user }
        newUserInfo.success = false
        newUserInfo.error = error.message
      })
  }

  //Facebook sign in  handle
  const facebookSignInHandle = () => {
    const facebookProvider = new FacebookAuthProvider()
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        console.log(result)
        const { displayName, email } = result.user
        setUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          success: true,
        })
        setLoggedInUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          role: 0,
        })
        history.replace(from)
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = { ...user }
        newUserInfo.success = false
        newUserInfo.error = error.message
      })
  }

  //Email & password login handle
  const handleChange = e => {
    let isFormValid = true
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      isFormValid = /(?=.*\d).{6,}/.test(e.target.value)
    }
    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }
  const handleSubmit = e => {
    if (newUser && user.email && user.password) {
      fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => response.json())
        .then(data => {
          console.log('User Created')
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
        })
        .catch(err => {
          console.log(err)
          const newUserInfo = { ...user }
          newUserInfo.success = false
          newUserInfo.error = err.message
          setUser(newUserInfo)
        })
    }
    if (!newUser && user.email && user.password) {
      fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)

          const { name, email, role } = data.user
          setUser({
            isSignedIn: true,
            name: name,
            email: email,
            error: '',
            success: true,
          })
          setLoggedInUser({
            isSignedIn: true,
            name: name,
            email: email,
            role: role,
          })
          history.replace(from)
        })
        .catch(error => {
          // Handle Errors here.
          console.log(error)
          const newUserInfo = { ...user }
          newUserInfo.success = false
          newUserInfo.error = error.message
          setUser(newUserInfo)
        })
    }
    e.preventDefault()
  }

  return (
    <div>
      <Header />
      <div className='signup-form'>
        <form onSubmit={handleSubmit}>
          {newUser ? (
            <div>
              <h2>Sign Up</h2>
              <p>Please fill in this form to create an account!</p>
            </div>
          ) : (
            <div>
              <h2>Sign In</h2>
              <p>Please fill in this form to login!</p>
            </div>
          )}
          <hr />
          {newUser && (
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <span className='fa fa-user'></span>
                  </span>
                </div>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  onBlur={handleChange}
                  placeholder='Username'
                  required
                />
              </div>
            </div>
          )}
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fas fa-envelope'></i>
                </span>
              </div>
              <input
                type='email'
                className='form-control'
                name='email'
                onBlur={handleChange}
                placeholder='Email Address'
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fas fa-fingerprint'></i>
                </span>
              </div>
              <input
                type='password'
                className='form-control'
                name='password'
                onBlur={handleChange}
                placeholder='Password'
                required
              />
            </div>
          </div>
          <div className='form-group'>
            {newUser ? (
              <button type='submit' className='btn btn-primary w-100 btn-lg'>
                Sign Up
              </button>
            ) : (
              <button type='submit' className='btn btn-primary w-100 btn-lg'>
                Sign In
              </button>
            )}
          </div>
        </form>
        <div className='text-center'>
          {newUser ? (
            <span>
              Already have an account?{' '}
              <b
                className='toggleBtn text-secondary'
                onClick={() => setNewUser(!newUser)}
              >
                SIGN-IN!
              </b>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <b
                className='toggleBtn text-secondary'
                onClick={() => setNewUser(!newUser)}
              >
                SIGN-UP!
              </b>
            </span>
          )}

          {newUser ? (
            <div>
              <p style={{ color: 'red' }}>{user.error}</p>
              {user.success && (
                <p style={{ color: 'green' }}>User created successfully!</p>
              )}
            </div>
          ) : (
            <div>
              <p style={{ color: 'red' }}>{user.error}</p>
              {user.success && (
                <p style={{ color: 'green' }}>User Signed in successfully!</p>
              )}
            </div>
          )}
          <button
            style={{ width: '250px' }}
            onClick={googleSignInHandle}
            className='btn btn-danger mb-2'
          >
            Sign in with <i className='fab fa-google'></i>
          </button>
          <br />
          <button
            style={{ width: '250px', backgroundColor: 'blue', color: 'white' }}
            onClick={facebookSignInHandle}
            className='btn'
          >
            Sign in with <i className='fab fa-facebook-f'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
