import React from "react"
import Image from "gatsby-image"
import styled from "styled-components"

import { Col } from "./commons"
import { rhythm } from "../utils/typography"

interface Props {
  name: string,
  src: string
  twitter: string
}

const Avatar = ({name, src, twitter}: Props) => 
  <AvatarContainer>
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
      <a href={`https://twitter.com/${twitter}`} target="_blank">{`@${twitter}`}</a>
    </Col>
  </AvatarContainer>

export default Avatar

const AvatarContainer = styled.li`
  display: flex;
  align-items: center;
  margin-right: ${rhythm(1)};
  margin-bottom: 0;
  &:last-child {
    margin-right: 0;
  }
`