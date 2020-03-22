export type ChildImageSharp = {
  childImageSharp: {
    fluid?: {
      aspectRatio: number
      src: string
      srcSet: string
      sizes: string
      base64: string
      tracedSVG: string
      srcWebp: string
      srcSetWebp: string
    }
    fixed?: string
  }
}

export type Author = {
  id: string
  description: string
  name: string
  image: ChildImageSharp
  twitter: string
  github: string
  website: string
  linkedin: string
}