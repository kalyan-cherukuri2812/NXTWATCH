import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Videodetails from './components/VideoDetails'
import propsContext from './context/context'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/Savedvideos'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

// Replace your code here

class App extends Component {
  state = {isDarkMode: false}

  toggleMode = () => {
    this.setState(prev => ({isDarkMode: !prev.isDarkMode}))
  }

  render() {
    const {isDarkMode} = this.state
    return (
      <propsContext.Provider value={{isDarkMode, toggleMode: this.toggleMode}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={Videodetails} />
          <Route component={NotFound} />
        </Switch>
      </propsContext.Provider>
    )
  }
}

export default App
