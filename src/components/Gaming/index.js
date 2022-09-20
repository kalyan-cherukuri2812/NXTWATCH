import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaGamepad} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import Options from '../Options'
import propsContext from '../../context/context'

class Gaming extends Component {
  state = {gamingList: [], loader: true, failureView: false}

  retry = () => {
    this.getData()
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const cookiesData = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookiesData}`,
      },
    }
    const response = await fetch(url, options)
    const respData = await response.json()

    if (response.ok) {
      const data = respData.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({gamingList: data, loader: false, failureView: false})
    } else {
      console.log(response)
      console.log(respData)
      this.setState({failureView: true, loader: false})
    }
  }

  render() {
    const {gamingList, loader, failureView} = this.state
    console.log(gamingList)
    return (
      <propsContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div
              className={`trending-bg-container ${
                isDarkMode ? 'dark-bg' : 'light-bg'
              }`}
            >
              <Header />
              <div className="trending-card">
                <Options />
                <div className="trending-page">
                  <div className="VscFlame">
                    <FaGamepad className="tr-t-logo" />
                    <h1
                      className={`tr-t-h ${
                        isDarkMode ? 'dark-text' : 'light-text'
                      }`}
                    >
                      Gaming
                    </h1>
                  </div>
                  {loader ? (
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color={isDarkMode ? '#ffffff' : '#000000'}
                        height="50"
                        width="50"
                      />
                    </div>
                  ) : null}
                  {failureView === false ? (
                    <ul className="gm-ul">
                      {gamingList.map(each => (
                        <Link
                          key={each.id}
                          className="gm-link"
                          to={`/Videos/${each.id}`}
                        >
                          <li className="gm-li">
                            <img
                              className="gm-img"
                              src={each.thumbnailUrl}
                              alt="img"
                            />
                            <h3
                              className={`title ${
                                isDarkMode ? 'dark-text' : 'light-text'
                              }`}
                            >
                              {each.title}
                            </h3>
                            <p className="gm-p">
                              {each.viewCount} Watching Worldwide
                            </p>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <div className="no-results-div">
                      <img
                        className="no-results-img"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png "
                        alt="no videos"
                      />
                      <h3 className={isDarkMode ? 'dark-text' : 'light-text'}>
                        Oops! Something Went Wrong
                      </h3>
                      <p className="no-res-p">
                        We are having some trouble to complete your request.
                        Please try again.
                      </p>
                      <button
                        onClick={this.retry}
                        className="retry-btn"
                        type="button"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}

export default Gaming
