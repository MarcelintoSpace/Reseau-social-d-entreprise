//importation du CSS
import './App.css';
//importation du router
import {BrowserRouter as Router, Route} from 'react-router-dom'
//importation de la route Home
import Home from "./pages/Home/Home";
//importation de la route Signin
import Signin from "./pages/Signin/Signin";
//importation de la route login
import Login from "./pages/Login/Login";
//importation de la route Upload
import Upload from "./pages/Upload/Upload";
//importation de la Navbar
import Navbar from "./components/Navbar";
//importation du Profile
import Profile from "./pages/Profile/Profile";
//git

function App() {
  return (
<>
{/*insertion de la Navbar au Top*/}
<Navbar />
{/*création de la route principale*/}
    <Router>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/signin" exact render={() => <Signin />} />
      <Route path="/login" exact render={() => <Login />} />
      <Route path="/upload" exact render={() => <Upload />} />
      <Route path="/profile" exact render={() => <Profile />} />
    </Router>
</>
  );
}

//export de app
export default App;
