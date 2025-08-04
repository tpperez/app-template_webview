export const FOOTER_DATA_QUERY = `
  {
    footer {
      text
      copyrightText
      sectionLink {
        id
        title
        links {
          id
          text
          href
        }
      }
    }
  }
`
