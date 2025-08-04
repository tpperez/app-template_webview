import Header from './header'
import getHeaderData from './queries'

const HeaderContainer = async () => {
  const { success, data, error } = await getHeaderData()

  if (!success || !data) {
    console.error('Error fetching header data:', error)
    return null
  }

  const { header } = data

  return <Header data={header} />
}

export default HeaderContainer
