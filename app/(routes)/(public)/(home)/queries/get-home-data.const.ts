export const HOME_DATA_QUERY = `
  {
    home {
      hero {
        description
      }
      stats {
        items {
          id
          title
          subtitle
        }
      }
      stack {
        title
        description
        items {
          id
          image {
            alt
            url
            height
            width
          }
          title
          list {
            items {
              id
              label
            }
          }
        }
      }
      benefits {
        title
        description
        items {
          image {
            alt
            url
            height
            width
          }
          id
          title
          description
        }
      }
      getStarted {
        title
        description
        commands {
          id
          command
        }
      }
    }
  }
`
