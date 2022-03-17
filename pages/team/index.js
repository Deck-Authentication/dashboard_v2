import useSWR from "swr"
import { getAccessToken } from "../../utils"
import axios from "axios"

const fetcher = async (url) => {
  const accessToken = await getAccessToken()
  return await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => res.data)
}

export default function Team({ BACKEND_URL }) {
  return <div>Team</div>
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}
