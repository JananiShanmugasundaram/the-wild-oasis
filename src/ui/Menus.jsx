import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useDetectClickOutside } from "../hooks/useDetectClickOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const openMenu = setOpenId;
  const closeMenu = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, openMenu, closeMenu, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ id }) {
  const { openId, openMenu, closeMenu, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? openMenu(id) : closeMenu();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, closeMenu } = useContext(MenusContext);
  const ref = useDetectClickOutside(closeMenu, false);

  if (openId === id) {
    return createPortal(
      <StyledList position={position} ref={ref}>
        {children}
      </StyledList>,
      document.body
    );
  } else return null;
}

function Button({ children, icon, onClick }) {
  const { closeMenu } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    closeMenu();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
