import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import FogotPassword from './pages/FogotPassword'
import ResetPassword from './pages/ResetPassword'
import ManageSkills from './pages/ManageSkills'
import ManageTimeLine from './pages/ManageTimeLine'
import ManageProjects from './pages/ManageProjects'
import ViewProjects from './pages/ViewProjects'
import UpdateProjects from './pages/UpdateProjects'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
   <Router>
    <Routes>


      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/password/fogot" element={<FogotPassword/>} />
      <Route path="/password/reset/:token"  element={<ResetPassword/>}/>
      <Route path="/manage/skills"  element={<ManageSkills/>}/>
      <Route path="/manage/timeline" element={<ManageTimeLine/>}/>
      <Route path="/manage/projects" element={<ManageProjects/>}/>
      <Route path="/view/project/:id"  element={<ViewProjects/>}/>
      <Route path="/update/project/:id" element={<UpdateProjects/>}/>
         
     
    </Routes>
    <ToastContainer position="bottom-right" theme="dark"/>
   </Router>
  )
}

export default App
