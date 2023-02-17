import styled from "@emotion/styled";
import React from "react";

const NotFoundContainer = styled.div`
  margin: auto;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <h1>404 Not Found</h1>
      <p>It seems you are lost !</p>
    </NotFoundContainer>
  );
}

export default NotFound;
