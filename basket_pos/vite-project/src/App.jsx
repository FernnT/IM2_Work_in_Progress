import { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import posPage from './components/PosPage'
import popUPgarment from './components/PopUPgarment'


function App() {
  


  return (
  <Router>
    <div className='App'>

      <Routes>
        <Route exact path='/' Component={Login}/>

        <Route exact path='/pos' Component={posPage}/>
        
        {/* remove later because this is popup */}
        {/* <Route exact path = 'garments' Component={popUPgarment}/> */}


      </Routes>


    </div>
  </Router>
   
  )
}

export default App
