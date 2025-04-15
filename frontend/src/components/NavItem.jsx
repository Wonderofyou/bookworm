// src/components/NavItem.jsx
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition-all duration-150 ${isActive ? "underline" : "hover:underline"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
