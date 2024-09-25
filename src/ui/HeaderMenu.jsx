import { HiOutlineUser } from "react-icons/hi2";
import LogOut from "../features/authentication/LogOut";
import ButtonIcon from "./ButtonIcon";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const StyledMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <LogOut />
      </li>
    </StyledMenu>
  );
}

export default HeaderMenu;
