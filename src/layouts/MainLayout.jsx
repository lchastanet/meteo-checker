import { Outlet } from "react-router-dom";

import Header from "../partials/Header";
import Footer from "../partials/Footer";
import styled from "@emotion/styled";

const FullSizeMain = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

function MainLayout() {
  return (
    <>
      <Header />
      <FullSizeMain>
        <Outlet />
      </FullSizeMain>
      <Footer />
    </>
  );
}

export default MainLayout;
