import React, { useEffect, useState } from 'react'
import ArticleCard from '../Article/ArticleCard'
import SlidingBanner from '../Carousel/SlidingBanner'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/articles`)
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setFilteredArticles(data)
      })
      .catch(err => console.log(err))
  }, [])
  const handleLoad = () => {
    setFilteredArticles(articles)
  }
  const handleClick = e => {
    const filtered = articles.filter(
      article => article.category === e.target.innerText
    )
    setFilteredArticles(filtered)
  }

  return (
    <div>
      <Header />
      <SlidingBanner />
      <div className='container  pt-5'>
        <h2 className='text-center'>Welcome to Witness Daily</h2>

        <hr />
        <div className='container mt-5'>
          <div className='row'>
            <div className=' col-md-8'>
              <div>
                <h2>LATEST NEWS</h2>
                <ArticleCard articles={filteredArticles} />
              </div>
            </div>
            <div className='col-md-4'>
              <h2>CATEGORIES</h2>
              <ul className='category-list bg-light rounded shadow p-3 list-group'>
                <li onClick={handleLoad} className='list-group-item'>
                  All Category
                </li>
                <li onClick={handleClick} className='list-group-item'>
                  Sports
                </li>
                <li
                  onClick={handleClick}
                  name='Entertainment'
                  className='list-group-item'
                >
                  Entertainment
                </li>
                <li onClick={handleClick} className='list-group-item'>
                  Technology
                </li>
                <li onClick={handleClick} className='list-group-item'>
                  Business
                </li>
                <li onClick={handleClick} className='list-group-item'>
                  Politics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
