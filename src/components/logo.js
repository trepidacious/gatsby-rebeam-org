import React from "react"
// import { graphql } from "gatsby"
// import Img from "gatsby-image"

// export default ({ data }) => (
//   <Img fixed={data.file.childImageSharp.fixed} />
// )

// export const query = graphql`
//   query {
//     file(relativePath: { eq: "images/icons/128x128.png" }) {
//       childImageSharp {
//         fixed(width: 64, height: 64) {
//           ...GatsbyImageSharpFixed
//         }
//       }
//     }
//   }
// `

// export const query = graphql`
//   query {
//     file(relativePath: { eq: "images/icons/128x128.png" }) {
//       childImageSharp {
//         fixed(width: 64, height: 64) {
//           base64
//           width
//           height
//           src
//           srcSet
//         }
//       }
//     }
//   }
// `

import logo from "../images/icons/icon.svg"

// TODO remove inline styling
export default () => (
  <img src={logo} alt='Logo' width='32px' height='32px' style={{top: '8px', position: 'relative', marginRight: '8px'}}/>
)