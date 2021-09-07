import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import bg1 from '../../assets/images/bg1.jpg'
import bg2 from '../../assets/images/bg2.jpg'
import bg3 from '../../assets/images/bg3.jpg'

const SlidingBanner = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className='d-block w-100' src={bg1} alt='First slide' />
          <Carousel.Caption>
            <h1>Country’s Most Vibrant Newspaper</h1>
            <p>
              The news isn't there to tell you what happened. It's there to tell
              you what it wants you to hear.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={bg2} alt='Second slide' />

          <Carousel.Caption>
            <h1>Because you deserve nothing but the truth</h1>
            <p>
              The news isn't there to tell you what happened. It's there to tell
              you what it wants you to hear.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={bg3} alt='Third slide' />

          <Carousel.Caption>
            <h1>We know what you are Searching</h1>
            <p>
              The news isn't there to tell you what happened. It's there to tell
              you what it wants you to hear.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default SlidingBanner
