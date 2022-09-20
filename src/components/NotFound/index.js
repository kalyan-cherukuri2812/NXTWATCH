import './index.css'
import Header from '../Header'
import propsContext from '../../context/context'

const NotFound = () => (
  <propsContext.Consumer>
    {value => {
      const {isDarkMode} = value
      return (
        <div className={isDarkMode ? 'dark-bg' : 'light-bg'}>
          <Header />
          <div className="not-found-div">
            <img
              className="n-f-img"
              src={
                isDarkMode
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
              }
              alt="img"
            />
            <h2 className={isDarkMode ? 'dark-text' : 'light-text'}>
              Page Not Found
            </h2>
            <p className="n-f-p">We are sorry, the page you requested</p>
          </div>
        </div>
      )
    }}
  </propsContext.Consumer>
)

export default NotFound
