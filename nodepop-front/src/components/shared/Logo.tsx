import { Link } from 'react-router-dom';
import logo from '../../assets/images/nodelogo.svg';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="nodepop" className="logo" />
    </Link>
  );
};

export default Logo;
