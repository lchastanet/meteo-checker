import styled from "@emotion/styled";
import React from "react";

const StyledFooter = styled.footer`
  padding: 1em;
  background-color: var(--light-blue);
  font-size: small;
  text-align: center;
  color: var(--grey);
`;

function Footer() {
  return <StyledFooter>&copy; Wilders</StyledFooter>;
}

export default Footer;
