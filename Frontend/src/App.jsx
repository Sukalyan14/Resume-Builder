import Bg from './assets/pngegg.png'
import './App.css'
import { TopContainer } from './components/styled-components/TopContainer'
import {Login} from './components/Login'



function App() {


  return (
    
    <div className='max-w-screen-xl h-[750px] flex '>

      <div 
        className="w-[350px]
                  m-3 p-5
                  flex flex-col 
                  bg-form-background 
                  shadow-lg 
                  backdrop-blur-xs
                  rounded-2xl 
                  overflow-hidden"
      >
          
          {/* <div className="top-container">
            <h1>Create Account</h1>
          </div> */}
          <TopContainer>
            
            <h2 className='text-3xl font-extrabold text-header-color tracking-wide'>Create</h2>
            <h2 className='text-3xl font-extrabold text-header-color tracking-wide'>Account</h2>
            <h5 className='text-lg font-medium text-header-color mt-1'>Please Sign Up To Continue!</h5>
            
          </TopContainer>
          
          <Login />

          <div className="bottom-container">
            <p>Not a member <span>Login</span></p>
          </div>
          
      </div>
      
      <div className="h-full">
        <img 
          className='w-100 h-full object-cover'
          src={Bg} alt="logo" 
        />
      </div>
      
    </div>
  )
}

export default App
