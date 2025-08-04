import { graphqlClient } from '@/app/services/http'

import { FOOTER_DATA_QUERY } from './get-footer-data.const'
import type { IFooterDataResponse } from './get-footer-data.type'

const getFooterData = async () => {
  try {
    const response = await graphqlClient.query<IFooterDataResponse>(
      FOOTER_DATA_QUERY,
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
    console.error('Error fetching footer data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export default getFooterData
