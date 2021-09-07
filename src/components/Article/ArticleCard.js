import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const ArticleCard = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        return (
          <div
            key={article._id}
            className='bg-light rounded shadow p-3 card mb-3'
          >
            <div className='row g-0'>
              <div className='col-md-6'>
                <img
                  src={article.photo}
                  className='mt-3 img-fluid rounded-start'
                  alt='nes'
                />
              </div>
              <div className='col-md-6'>
                <div className='card-body mt-1'>
                  <h5 className='card-title'>{article.title}</h5>
                  <p className='card-text'>
                    {article.description.substring(0, 60)}...
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>
                      Last updated {moment(article.createdAt).fromNow()}
                    </small>
                  </p>
                  <Link
                    to={`/article/${article._id}`}
                    className='btn btn-primary'
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ArticleCard
