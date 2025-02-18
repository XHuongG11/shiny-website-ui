import { useState } from "react";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import "./DropdownMenu.css";

export default function DropdownMenu() {
  const [setIsOpen] = useState(false);

  return (
    <div>
      {/* Navigation Menu */}
      {/* <nav className="menu">
        <a href="#" onMouseEnter={() => setIsOpen(true) } style={{ fontWeight: "bold" }}>Products</a>
        <a href="#">Collections</a>
        <a href="#">Gift Ideas</a>
        <a href="#">Contact Us</a>
      </nav> */}

      {/* Dropdown Menu */}
        <div className="dropdown" onMouseLeave={() => setIsOpen(false)} >
          <div className="dropdown-menu">
            <a href="#" style={{ fontWeight: "bold" }}>Products <ChevronRightRoundedIcon/></a>
            <a href="#">Collections <ChevronRightRoundedIcon/></a>
            <a href="#">Gift ideas <ChevronRightRoundedIcon/></a>
          </div>
          <div className="dropdown-column">
            <h4>Rings</h4>
            <a href="#">All rings</a>
            <a href="#">Heart & Promise Rings</a>
            <a href="#">Ring Sets</a>
            <a href="#">Best Seller Rings</a>
          </div>
          <div className="dropdown-column">
            <h4>Earrings</h4>
            <a href="#">All earrings</a>
            <a href="#">Drop earrings</a>
          </div>
          <div className="dropdown-column">
            <h4>Necklaces</h4>
            <a href="#">Chain necklaces</a>
            <a href="#">Pendant necklaces</a>
            <a href="#">Initial necklaces</a>
            <a href="#">Charm Pendants</a>
          </div>
          <div className="dropdown-column">
            <h4>Charms & Bracelets</h4>
            <a href="#">Charm Bracelets</a>
            <a href="#">Bangles</a>
            <a href="#">Chain Bracelets</a>
          </div>
        </div>
    </div>
  );
}
