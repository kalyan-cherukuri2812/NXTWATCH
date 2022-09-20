import React from 'react'

const propsContext = React.createContext({
  isDarkMode: false,
  toggleMode: () => {},
})
export default propsContext
