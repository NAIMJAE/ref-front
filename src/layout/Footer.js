import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id='footer'>
      <div>
        <div>
          <h2>RefCode.info</h2>
          <h3>RefCode introduces various web programming concepts and provides examples.</h3>
          <h3>Enhance your web programming skills with RefCode.</h3>
          {/**<전체를 뒤엎을 변화>.<기능 수정, 기능 추가>.<버그, 내부 적 코드 보완>.<배포날짜>*/}
          <h4>v1.2.2.2410131</h4>
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
                <Link to={"https://github.com/NAIMJAE"} target='_blank'>
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
                <Link to={"https://github.com/linma21"} target='_blank'>
                  <img src="../../images/main/github_icon.png" alt="blog" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;