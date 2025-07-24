import { HashRouter, Route, Routes } from 'react-router'
import { PageHome } from '@/pages/home'
import { PageNewUser } from '@/pages/new-user'
import PageEditUser from '@/pages/edit-user'
import { MainLayout } from '@/shared/ui'
import PageAuth from '@/pages/auth'
import { ProtectedRoute } from './ProtectedRoot'
import { useEffect } from 'react'
import { getMe } from '@/entities/auth'
import { useAppDispatch } from '../provider/store'

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  return (
    <HashRouter>
        <Routes>
          <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute> }>
            <Route path="/" element={<PageHome/>}/>
            <Route path="/user/create" element={<PageNewUser/>}/>
            <Route path="/user/:id" element={<PageEditUser/>}/>
          </Route>
          <Route path="/login" element={<PageAuth/>}/>
        </Routes>
    </HashRouter>
  )
}

export default App
