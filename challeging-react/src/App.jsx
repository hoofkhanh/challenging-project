import PhoneNumbeForm from "./components/PhoneNumberForm/PhoneNumberForm";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import GithubUser from "./components/UserGithub/GithubUser";
import FavoriteUser from "./components/FavoriteUser/FavoriteUser";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PhoneNumbeForm/>} />
          <Route path="/github-users" element={<GithubUser />} />
          <Route path="/favorite-github-users" element={<FavoriteUser />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
