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
import { toast } from 'react-toastify'
import axios from 'axios'

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
    const newUserInfo = { ...user }
    newUserInfo[e.target.name] = e.target.value
    setUser(newUserInfo)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    // User Signup
    if (newUser && user.email && user.password) {
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
      }
      console.log(newUser)
      try {
        console.log('1 inside try')
        let res = await axios.post(
          `${process.env.REACT_APP_API_URL}/signup`,
          newUser
        )
        console.log('REGISTER USER ===> ', res)
        toast.success('Register success. Please login.')
        setNewUser(false)
      } catch (err) {
        console.log(err.response.data)
        console.log(err.response.status)
        toast.error(err.response.data.error)
      }
    }
    // User Signin
    if (!newUser && user.email && user.password) {
      const newUser = {
        email: user.email,
        password: user.password,
      }
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/signin`,
          newUser
        )

        if (res.data) {
          console.log(res.data.user)
          const { name, email, role } = res.data.user
          toast.success('Welcome Back!')
          setUser({
            isSignedIn: true,
          })
          setLoggedInUser({
            isSignedIn: true,
            name: name,
            email: email,
            role: role,
          })
          history.replace(from)
        }
      } catch (err) {
        if (err.response.status === 400) toast.error(err.response.data.error)
      }
    }
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
