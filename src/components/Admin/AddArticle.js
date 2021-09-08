import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { toast } from 'react-toastify'

const AddArticle = () => {
  const [redirect, setRedirect] = useState(false)
  const [values, setValues] = useState({
    title: '',
    description: '',
    photo: '',
    author: '',
    category: '',
  })

  // eslint-disable-next-line no-unused-vars
  const { title, description, author, photo, category } = values

  const handleChange = name => event => {
    const value = event.target.value
    setValues({ ...values, [name]: value })
  }

  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData()
    imageData.set('key', 'aa28e6c2d58fc015a684aed671e50c4a')
    imageData.append('image', event.target.files[0])

    axios
      .post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        console.log(response)
        console.log(response.data.data.display_url)
        setValues({ ...values, photo: response.data.data.display_url })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const clickSubmit = event => {
    event.preventDefault()
    const articleData = {
      title: title,
      description: description,
      photo: photo,
      author: author,
      category: category,
    }

    fetch(`${process.env.REACT_APP_API_URL}/article/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    })
      .then(response => {
        if (response.status === 200) {
          toast.success('Article Published!')
          setTimeout(() => {
            setRedirect(true)
          }, 2000)
        } else {
          toast.error(response.statusText)
        }
      })
      .catch(err => {
        console.log(err)
        toast.error(err)
      })
  }

  const newPostForm = () => (
    // eslint-disable-next-line no-restricted-globals
    <form className='mb-3' onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-success btn-block  text-left'>
          Upload Image
          <input
            // eslint-disable-next-line no-restricted-globals
            onChange={() => handleImageUpload(event)}
            type='file'
            name='photo'
            accept='image/*'
            hidden
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Title</label>
        <input
          onChange={handleChange('title')}
          type='text'
          className='form-control'
          value={title}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          type='text'
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Author</label>
        <input
          onChange={handleChange('author')}
          type='text'
          className='form-control'
          value={author}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='cat' className='text-muted'>
          Category
        </label>
        <select
          onChange={handleChange('category')}
          type='text'
          className='form-control'
          value={category}
          class='form-control'
          id='cat'
        >
          <option>Choose Category:</option>
          <option>Entertainment</option>
          <option>Sports</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Politics</option>
        </select>
      </div>
      <div className='d-grid'>
        <button className='btn btn-primary btn-lg mt-5'>Publish</button>
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
            <h1 className='text-center'>ADD ARTICLE</h1>
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

export default AddArticle
