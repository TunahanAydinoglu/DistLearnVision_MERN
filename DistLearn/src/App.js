import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import Contact from "./components/contact/Contact";
import AboutUs from "./components/aboutUs/AboutUs";
import Lessons from "./components/lessons/Lessons";
import MainPage from "./components/mainPage/MainPage";
import Watch from "./components/watch/Watch";

function App() {
  return (
    <div className="light" >
      <Router>
        <Header />
        <Switch>
          <Route path="/iletisim">
            <Contact />
          </Route>
          <Route path="/izle">
            <Watch />
          </Route>
          <Route path="/hakkimizda">
            <AboutUs />
          </Route>
          <Route path="/dersler">
            <Lessons />
          </Route>
          <Route path="/profil">
            <Profile />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
