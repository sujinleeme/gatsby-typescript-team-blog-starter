import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { rhythm, colors } from "../styles";

export interface NavProps {
  title: string;
  url: string;
}

const Navbar = ({ items }: { items: NavProps[] }) => {
  return (
    <Nav>
      <ul>
        {items.map(({ url, title }) => (
          <li key={`nav-${title}`}>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={url}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  ul {
    display: flex;
    li {
      list-style: none;
      text-transform: capitalize;
      margin-right: ${rhythm(1)};
      &:hover {
        color: ${colors.default};
      }
    }
  }
`;
