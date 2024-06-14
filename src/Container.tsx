import { Route, Routes } from 'react-router-dom'
import Home from './modules/HomePage/HomePage'
import Navbar from './components/navbar/Navbar'
import { theme } from 'antd';
import { useEffect, useState } from 'react';
import AuthPage from './modules/Auth/AuthPage';
import axios from 'axios';
import ProjectsPage from './modules/Projects/ProjectsPage';
import UserStoryPage from './modules/UserStories/UserStoryPage';

function Container() {
  const [isAuth, setIsAuth] = useState(false)
  axios.interceptors.response.use(
    function (response) {
      if (response.status === 204) {
        // TODO it must be translated
        return Promise.reject("No Data Found");
      }
      return response;
    },
    function (error) {
      console.log("ERR")
      if (error?.response?.status) {
        switch (error?.response?.status) {
          case 401:
            console.log("auth")
            localStorage.removeItem('app-token')
            window.location.href = "/"
            break;
          default:
            alert(error?.response?.data?.Message)
            break;
        }
      }
      // setErrorMessages(error)
      return Promise.reject(error);
    });
  useEffect(() => {
    if (localStorage.getItem("app-token")) {
      setIsAuth(true)
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = localStorage.getItem("app-token");
        return config;
      })
    }
  }, [])
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!isAuth) {
    return <div className="container">
      <AuthPage />
    </div>
  }
  return (
    <div className='container' style={{ background: colorBgContainer }}>
      <Navbar />
      <Routes>
        <Route path='/userStory/:id' element={<UserStoryPage />} />
        <Route path='/projects/:id' element={<ProjectsPage />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default Container