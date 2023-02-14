import Logo from '../../Assets/Logo.png';
import { Header, ImgLogo, Title } from './styles';

function Nav() {
  return (
      <Header>
        <ImgLogo src={ Logo } alt="Logo" />
      </Header>
  );
}

export default Nav;