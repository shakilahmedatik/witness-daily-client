import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='p-3 bg-secondary'>
      <div className='container'>
        <p className='text-center text-light'>
          Copyright @2021 | Witness Daily
        </p>
        <ul className='social_footer_ul'>
          <li>
            <a href='https://www.facebook.com/shakil.atik15'>
              <i className='fab fa-facebook-f'></i>
            </a>
          </li>
          <li>
            <a href='https://twitter.com/ShakilAhmedAtik'>
              <i className='fab fa-twitter'></i>
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/shakilahmedatik'>
              <i className='fab fa-linkedin'></i>
            </a>
          </li>
          <li>
            <a href='https://www.instagram.com/__atik_/'>
              <i className='fab fa-instagram'></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
