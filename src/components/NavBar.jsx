import styled from "@emotion/styled";
import NavButton from "./NavButton";

const StyledNav = styled.nav`
  background-color: var(--light-blue);
  color: #808080;
  padding: 1em;
`;

function NavBar() {
  return (
    <StyledNav>
      <NavButton dest="/">Home</NavButton>
      <NavButton dest="/about">About</NavButton>
    </StyledNav>
  );
}

export default NavBar;
