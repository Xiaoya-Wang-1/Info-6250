import React from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import MainPage from './components/MainPage'
import AdminPage from './components/AdminPage'
import useApp from './hooks/useApp'

export default function App() {
  const { view, loginProps, registerProps, adminProps, mainProps } = useApp()

  if (view === 'register') return <RegisterPage {...registerProps} />
  if (view === 'login')    return <LoginPage    {...loginProps} />
  if (view === 'admin')    return <AdminPage    {...adminProps} />
  return                     <MainPage      {...mainProps} />
}