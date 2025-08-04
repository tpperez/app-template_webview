import { graphqlClient } from '@/app/services/http'

import { HEADER_DATA_QUERY } from './get-header-data.const'
import type { IHeaderDataResponse } from './get-header-data.type'

const getHeaderData = async () => {
  try {
    const response = await graphqlClient.query<IHeaderDataResponse>(
      HEADER_DATA_QUERY,
      {},
      {
        baseUrl: 'https://graphql.datocms.com/',
        revalidate: 300, // 5 min
        headers: {
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        },
      },
    )

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    console.error('Error fetching header data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export default getHeaderData
