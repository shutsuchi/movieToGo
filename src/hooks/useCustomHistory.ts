import { useHistory } from 'react-router-dom'

interface HistoryItem {
  pathname: string
  state: { [key: string]: any }
}

export const useCustomHistory = () => {
  const history = useHistory()

  const handleMovePage = (url: string | HistoryItem) => {
    history.push(url)
  }

  return { handleMovePage }
}
