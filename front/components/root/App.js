import Logo from "../toolbox/Logo";
import Menu from "../toolbox/Menu";
import SearchInput from "../toolbox/SearchInput"
import { SignInButton, SignUpButton } from "../toolbox/SignButton";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app} >
      <Logo></Logo>
      <Menu/>
      <SearchInput></SearchInput>
      <SignInButton/>
      <SignUpButton/>
    </div>
  );
}

export default App;
