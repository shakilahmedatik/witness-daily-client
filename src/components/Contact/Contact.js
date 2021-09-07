import React, { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Contact = () => {
  const [values, setValues] = useState({
    name: '',
    message: '',
  })

  // eslint-disable-next-line no-unused-vars
  const { name, message } = values

  const handleChange = name => event => {
    const value = event.target.value
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = event => {
    event.preventDefault()
    const messageData = {
      name,
      message,
    }
    console.log(messageData)
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
        <label className='text-muted'>Message</label>
        <textarea
          onChange={handleChange('message')}
          type='text'
          className='form-control'
          value={message}
        />
      </div>

      <div className='d-grid'>
        <button className='btn btn-primary btn-lg mt-5'>
          Send <i className='fas fa-paper-plane'></i>
        </button>
      </div>
    </form>
  )

  return (
    <div>
      <Header />

      <div className='container mt-4 mb-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <h1 className='text-center'>Contact Us</h1>
            <hr />
            <div className='bg-light rounded shadow p-3'>{newPostForm()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
