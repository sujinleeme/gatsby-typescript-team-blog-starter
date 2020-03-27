import React from "react";
import Image, { FixedObject } from "gatsby-image";
import styled from "styled-components";

import { Col } from "./commons";
import { rhythm } from "../styles";

interface AvatarProps {
  name: string;
  src: FixedObject;
  twitter?: string;
}

export const Avatar = ({ name, src, twitter }: AvatarProps) => (
  <Box>
    <Image
      fixed={src}
      alt={name}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        minWidth: 50,
        borderRadius: `100%`,
      }}
      imgStyle={{
        borderRadius: `50%`,
      }}
    />
    <Col>
      <span>{name}</span>
      {twitter && (
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >{`@${twitter}`}</a>
      )}
    </Col>
  </Box>
);

export const AvatarWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  margin-bottom: ${rhythm(1)};
`;

const Box = styled.li`
  display: flex;
  align-items: center;
  margin-right: ${rhythm(1)};
  margin-bottom: 0;
  &:last-child {
    margin-right: 0;
  }
`;
