import { Signup_Login } from './pages/index'
import './App.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <Signup_Login/>
    </Provider>    
  )
}

export default App
