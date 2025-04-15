// src/components/Navbar.jsx
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 m-4 bg-gray-100 shadow-md rounded-lg">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="font-bold text-lg">BOOKWORM</span>
      </div>
      <div className="space-x-4 text-sm">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/shop">Shop</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/cart">Cart (0)</NavItem>
        <NavItem to="/signin">Sign In</NavItem>
      </div>
    </nav>
  );
};

export default Navbar;
