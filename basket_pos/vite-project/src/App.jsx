import { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import posPage from './components/posPage'

function App() {
  


  return (
  <Router>
    <div className='App'>

      <Routes>
        <Route exact path='/' Component={Login}/>

        <Route exact path='/pos' Component={posPage}/>



      </Routes>


    </div>
  </Router>
   
  )
}

export default App
