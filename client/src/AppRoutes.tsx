import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Login = React.lazy(()=>import('./screens/LogIn/Login'))
const AppRoutes = () => {
  return (
    <Router>
       <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRoutes