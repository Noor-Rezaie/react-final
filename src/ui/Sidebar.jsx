import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  /* padding: 2rem 4.8rem; */
  padding: 2rem 2.8rem;
  border-right: 1px solid var(--color-grey-300);

  /* Make this to take the entire hieght! of its container */
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.3rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      {/* FOR REAPPLOADING THE FILE */}
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
