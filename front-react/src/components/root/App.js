import Footer from "../layout/Footer";
import Navi from "../layout/Navi";

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
