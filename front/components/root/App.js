import Footer from "../layout/Footer";
import Navi from "../layout/Navi";
import ProfileUpdate from "../profile/ProfileUpdate";
import SignInPage from "../signPage/SignInPage";

function App({child}) {
  return (
    <div>
      <Navi />
      {child}
      <Footer />
    </div>
  );
}

export default App;
