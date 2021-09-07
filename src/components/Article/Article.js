import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import moment from 'moment'

const Article = () => {
  const [article, setArticle] = useState({
    title: '',
    photo: '',
    author: '',
    category: '',
    description: '',
    createdAt: '',
  })
  const id = useParams({}).articleId
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/article/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data)
        console.log(data)
      })
      .catch(err => console.log(err))
  }, [id])
  return (
    <div>
      <Header />
      <div className='container mt-4'>
        <h1 className='mb-4'>{article.title}</h1>
        <div className='text-center mb-4'>
          <img src={article.photo} alt='' className='img-fluid' />
        </div>
        <p className='text-muted'>
          Author: <span className='text-primary'>{article.author}</span>
        </p>
        <p className='text-muted'>
          Category: <span className='text-primary'>{article.category}</span>{' '}
        </p>
        <p className='text-muted'>
          Added:{' '}
          <span className='text-primary'>
            {moment(article.createdAt).fromNow()}
          </span>{' '}
        </p>
        <p>{article.description}</p>
      </div>
      <Footer />
    </div>
  )
}

export default Article
