import { graphqlClient } from '@/app/services/http'

import { HOME_DATA_QUERY } from './get-home-data.const'
import type { IHomeDataResponse } from './get-home-data.type'

const getHomeData = async () => {
  try {
    const response = await graphqlClient.query<IHomeDataResponse>(
      HOME_DATA_QUERY,
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
    console.error('Error fetching page data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export default getHomeData
