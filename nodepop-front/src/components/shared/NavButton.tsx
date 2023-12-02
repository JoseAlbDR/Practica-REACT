import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface NavButtonProps {
  to: string;
  name: string;
}

const StyledNavLink = styled(NavLink)`
  background: var(--primary-100);
  color: var(--green-dark);
`;

const NavButton = ({ to, name }: NavButtonProps) => {
  return (
    <StyledNavLink to={to} className="btn menu-btn" end>
      {name}
    </StyledNavLink>
  );
};

export default NavButton;
