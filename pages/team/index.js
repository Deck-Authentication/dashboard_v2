import useSWR from "swr"
import { getAccessToken } from "../../utils"
import axios from "axios"
import { useEffect } from "react"

const fetcher = async (url) => {
  const accessToken = await getAccessToken()
  return await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => res.data)
}

export default function Team({ BACKEND_URL }) {
  const { data, error } = useSWR(`${BACKEND_URL}/profile`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <div>{JSON.stringify(data)}</div>
  // useEffect(() => {
  //   ;(async function () {
  //     const accessToken = await getAccessToken()
  //     console.log(`accessToken: ${accessToken}`)
  //   })()
  // })

  // return <div>Team</div>
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}
