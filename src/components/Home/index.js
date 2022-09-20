import './index.css'
import {Component} from 'react'
import {GrClose} from 'react-icons/gr'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Options from '../Options'
import propsContext from '../../context/context'

class Home extends Component {
  state = {
    bannerClose: false,
    loader: true,
    search: '',
    videosList: [],
    noSearchRes: false,
    failureView: false,
  }

  searchChange = event => {
    this.setState({search: event.target.value})
  }

  searchClick = () => {
    this.getData()
    const {videosList} = this.state
    if (videosList.length !== 0) {
      this.setState({noSearchRes: true})
    } else {
      this.setState({noSearchRes: false})
    }
  }

  preBannerClose = () => {
    this.setState({bannerClose: true})
  }

  retry = () => {
    this.getData()
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {search} = this.state
    const CookiesData = Cookies.get('jwt_token')
    this.setState({loader: true})
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CookiesData}`,
      },
    }
    const response = await fetch(url, options)

    const respData = await response.json()

    if (response.ok) {
      const videosData = respData.videos.map(each => ({
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({videosList: videosData, loader: false, failureView: false})
    } else {
      console.log(response)
      console.log(respData)
      this.setState({failureView: true, loader: false})
    }
  }

  render() {
    const {
      bannerClose,
      videosList,
      loader,
      noSearchRes,
      failureView,
    } = this.state

    return (
      <propsContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div
              className={`home-bg-container ${
                isDarkMode ? 'dark-bg dark-text' : 'light-bg light-text'
              } `}
            >
              <Header />
              <div className="home">
                <Options />

                <div className="home-card">
                  {bannerClose === false ? (
                    <div className="buy-pre-card">
                      <div className="buy-pre-sub-card">
                        <img
                          className="buy-pre-logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="img"
                        />
                        <p className="buy-pre-p">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button className="buy-pre-button" type="button">
                          GET IT NOW
                        </button>
                      </div>
                      <GrClose onClick={this.preBannerClose} />
                    </div>
                  ) : null}
                  <div className="search-bar-div">
                    <input
                      onChange={this.searchChange}
                      className="search-input"
                      type="search"
                      placeholder="Search"
                    />
                    <button
                      onClick={this.searchClick}
                      className="search-btn"
                      type="button"
                    >
                      <BsSearch />
                    </button>
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
                    <ul className="videolist-ul">
                      {videosList.map(each => (
                        <Link
                          className="videolist-li"
                          key={each.id}
                          to={`/Videos/${each.id}`}
                        >
                          <li>
                            <img
                              className="thumbnail"
                              src={each.thumbnailUrl}
                              alt="thumbnailUrl"
                            />
                            <div className="title-profile-card">
                              <img
                                className="profile-img"
                                src={each.profileImageUrl}
                                alt="profileImageUrl"
                              />
                              <div className="title-div">
                                <h3
                                  className={`title ${
                                    isDarkMode ? 'dark-text' : 'light-text'
                                  }`}
                                >
                                  {each.title}
                                </h3>
                                <div className="n-v-p-div">
                                  <p className="name-h">{each.name}</p>
                                  <ul className="v-p-ul">
                                    <li className="v-c-li-v">
                                      {each.viewCount}
                                    </li>
                                    <li className="v-c-li-p">
                                      {each.publishedAt}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
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
                      <h3>Oops! Something Went Wrong</h3>
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

                  {noSearchRes ? (
                    <div className="no-results-div">
                      <img
                        className="no-results-img"
                        src={
                          isDarkMode
                            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                        }
                        alt="no videos"
                      />
                      <h3>No Search results found</h3>
                      <p className="no-res-p">
                        Try different key words or remove search filter
                      </p>
                      <button className="retry-btn" type="button">
                        Retry
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}

export default Home
