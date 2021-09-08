import React, { useState } from 'react'
import { Redirect } from 'react-router'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { toast } from 'react-toastify'

const AddAdmin = () => {
  const [redirect, setRedirect] = useState(false)
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 1,
  })

  // eslint-disable-next-line no-unused-vars
  const { name, email, password, role } = values

  const handleChange = name => event => {
    const value = event.target.value
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = event => {
    event.preventDefault()
    const adminData = {
      name,
      email,
      password,
      role,
    }

    fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    })
      .then(response => {
        if (response.status === 200) {
          toast.success('Signup Successful!')
          setTimeout(() => {
            setRedirect(true)
          }, 2000)
        } else {
          toast.error(response.statusText)
        }
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response.data)
      })
  }

  const newPostForm = () => (
    // eslint-disable-next-line no-restricted-globals
    <form className='mb-3' onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
        />
      </div>

      <div className='d-grid'>
        <button className='btn btn-primary btn-lg mt-5'>Save</button>
      </div>
    </form>
  )
  const redirectUser = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  return (
    <div>
      <Header />

      <div className='container mt-4 mb-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <h1 className='text-center'>ADD ADMIN</h1>
            <hr />
            <div className='bg-light rounded shadow p-3'>{newPostForm()}</div>

            {redirectUser()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AddAdmin
