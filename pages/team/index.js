import { useAdminData } from "../../utils"

export default function Team({ BACKEND_URL }) {
  const { data, error } = useAdminData(`${BACKEND_URL}/admin/get-all-data`)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const { teams } = data

  return (
    <div className="team w-full">
      {teams.length && teams.length > 0 ? (
        <div>{JSON.stringify(teams)}</div>
      ) : (
        <div>No teams found. Start adding team by importing from Github or input them manually.</div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}
