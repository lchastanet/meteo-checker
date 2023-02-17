import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const NavBarLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 1em 1.5em;
  color: #808080;
  &.active {
    background-color: var(--main-blue);
    color: #000;
  }
  &:hover {
    color: #000;
  }
`;

function NavButton({ children, dest }) {
  return <NavBarLink to={dest}>{children}</NavBarLink>;
}

export default NavButton;
