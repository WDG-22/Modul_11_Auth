import { BrowserRouter, Routes, Route } from 'react-router';
import { RootLayout } from '@/layouts';
import { CreatePost, Home, Login, NotFound, Post, Register } from '@/pages';
import AuthContextProvider from './context/AuthContext.jsx';

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='create' element={<CreatePost />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;
