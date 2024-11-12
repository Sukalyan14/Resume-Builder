import Bg from './assets/pngegg.png'
import './App.css'
import { BottomContainer, Login , TopContainer } from './components/index'

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
          <TopContainer/>
          <Login />
          <BottomContainer />          
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
