import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ManageSkills from './pages/ManageSkills'
import ManageMyWorks from './pages/ManageMyWorks'
import ManageProjects from './pages/ManageProjects'
import ViewProjects from './pages/ViewProjects'
import UpdateProjects from './pages/UpdateProjects'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useDispatch } from 'react-redux';    
import { getUser } from './store/slices/userSlice';
import "./App.css";
import { getAllMessages } from './store/slices/messagesSlices'
import { getAllMyWorks } from './store/slices/myWorksSlice'
import { getAllSkills } from './store/slices/skillsSlice'
import { getAllSoftwareApplications } from './store/slices/softwareApplicationSlice'
import { getAllProjects } from './store/slices/projectSlice'

const App = () => {

const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getUser());
  dispatch(getAllMessages());
  dispatch(getAllMyWorks());
  dispatch(getAllSkills());
  dispatch(getAllSoftwareApplications());
  dispatch(getAllProjects());
}, [dispatch]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route path="/manage/skills" element={<ManageSkills/>}/>
        <Route path="/manage/my-works" element={<ManageMyWorks/>}/>
        <Route path="/manage/projects" element={<ManageProjects/>}/>
        <Route path="/view/project/:id" element={<ViewProjects/>}/>
        <Route path="/update/project/:id" element={<UpdateProjects/>}/>
      </Routes>

      <ToastContainer position="bottom-right" theme="dark"/>
    </Router>
  )
}

export default App

