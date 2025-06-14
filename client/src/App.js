import './App.css';
import Navbar from './components/Navbar';
import Blog from './components/Blog'
import Addblog from './components/Addblog';
import BlogState from './Contextblog/BlogState';
import UserState from './Contextblog/UserState'
import Home from './components/Home'
import{
  Routes,
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Slug_BLog from './components/Slug_BLog';

function App() {
  return (<>
    <Router>
  <UserState>
  <BlogState>
  <Navbar/>
  <Routes>
    <Route exact path="/"  element={<Home/>}/>
    <Route exact path="/blogs"  element={<Blog/>}/>
    <Route exact path="/addblogs"  element={<Addblog/>}/>
    <Route exact path="/login"  element={<Login/>}/>
     <Route exact path="/signup"  element={<Signup/>}/>
     <Route exact path="/blog/:slug"  element={<Slug_BLog/>}/>

     
  </Routes>
  </BlogState>
  </UserState>
  </Router>
 
  </>
  );
}

export default App;
