import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Lottie from 'react-lottie'
import about from '../../assets/lotties/about.json'

const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: about,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div>
      <Header />
      <div className='container mt-5 mb-5'>
        <div className='row align-items-center'>
          <div className='col-md-6 p-3'>
            <h1 className='text-center pb-3'>About Witness Daily</h1>
            <hr />
            <h2>HISTORY</h2>
            <p>
              Witness Daily established its place in the media scene of
              Bangladesh on January 14, 1991. It started its journey with a
              sense of challenge and a feeling of humility to serve this nation
              as a truly independent newspaper. The newspaper made its debut at
              a historic time when, with the fall of an autocratic regime, the
              country was well set to begin a new era towards establishing a
              democratic system of government which eluded Bangladesh for too
              long.
            </p>
            <h2>OBJECTIVE</h2>
            <p>
              Witness Daily carries on with the long-term responsibility is to
              strengthen public opinion on how the democratic system should work
              and how to sustain and nurture democratic norms effectively. It
              was a privilege for The Daily Star to be part of a changing scene
              after the fall of military autocrat in early 1990s. With that
              privilege came an enormous responsibility of upholding the duties
              of a free press. The newspaper is proud to pursue that policy
              without relenting for the past 23 years.
            </p>
          </div>
          <div className='col-md-6'>
            <Lottie options={defaultOptions} height={400} width={300} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
