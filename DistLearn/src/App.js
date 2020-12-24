import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header/Header";
import ProfilePage from "./components/profile/ProfilePage";
import Contact from "./components/contact/Contact";
import AboutUs from "./components/aboutUs/AboutUs";
import Lessons from "./components/lessons/Lessons";
import MainPage from "./components/mainPage/MainPage";
import Watch from "./components/watch/Watch";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="light" >
      <Router>
        <Header />
        <div className="main-wrapper" >
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
            <ProfilePage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
        <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
