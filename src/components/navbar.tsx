import React from "react";
import { Link } from "gatsby";

interface Props {
  location: Location;
  title: string;
  children?: React.ReactNode;
}

const Navbar = () => {
  const items = [
    { title: "about", url: "/about" },
    { title: "contact", url: "/contact" },
  ];

  return (
    <nav>
      <ul>
        {items.map((item, index) => (
          <li key={`nav-${index}`}>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={item.url}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
