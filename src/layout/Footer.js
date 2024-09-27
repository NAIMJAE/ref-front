import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id='footer'>
      <div>
        <h2>RefCode.info</h2>
        <h3>RefCode introduces various web programming concepts and provides examples.</h3>
        <h3>Enhance your web programming skills with RefCode.</h3>
      </div>
      <div>
        <h2>Creator</h2>
        <div>
          <div className='creator'>
            <div className='name'>
              <img src="../../images/main/user_icon.png" alt="profile" />
              <h1>NAIMJAE</h1>
            </div>
            <div className='icon'>
              <Link to={"/"}>
                <img src="../../images/main/blog_icon.png" alt="blog" />
              </Link>
              <Link to={"/"}>
                <img src="../../images/main/github_icon.png" alt="blog" />
              </Link>
            </div>
          </div>

          <div className='creator'>
            <div className='name'>
              <img src="../../images/main/user_icon.png" alt="profile" />
              <h1>Linma</h1>
            </div>
            <div className='icon'>
              <Link to={"/"}>
                <img src="../../images/main/blog_icon.png" alt="blog" />
              </Link>
              <Link to={"/"}>
                <img src="../../images/main/github_icon.png" alt="blog" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;