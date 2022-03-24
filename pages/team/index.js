import { useAdminData, useGithubTeamRepos } from "../../utils"
import Link from "next/Link"

export default function Team({ BACKEND_URL }) {
  const { data, error } = useAdminData(`${BACKEND_URL}/admin/get-all-data`)

  if (error) return <div>{JSON.stringify(error)}</div>
  if (!data) return <div>loading...</div>

  const { teams } = data

  return (
    <div className="team w-full flex justify-center items-center">
      {teams.length && teams.length > 0 ? (
        <div className="mt-5 flex flex-row justify-center flex-wrap gap-4">
          {teams.map((team, id) => (
            <TeamCard team={team} cardKey={id} key={id} BACKEND_URL={BACKEND_URL} />
          ))}
        </div>
      ) : (
        <div>No teams found. Start adding team by importing from Github or input them manually.</div>
      )}
    </div>
  )
}

function TeamCard({ team, cardKey, BACKEND_URL }) {
  const { name, slug } = team
  const borderTopColors = [
    "border-t-blue-300",
    "border-t-red-300",
    "border-t-green-300",
    "border-t-purple-300",
    "border-t-orange-300",
    "border-t-yellow-300",
  ]
  const cardBorderTopColor = borderTopColors[cardKey % 6]
  const TeamCardStyles = `defined-card relative w-1/5 min-w-max h-36 mt-2 mr-2 bg-white cursor-pointer hover:shadow-lg border-gray-100 border-t-8 ${cardBorderTopColor}`

  const { data, error } = useGithubTeamRepos(`${BACKEND_URL}/github/team/list-repos?teamSlug=${slug}`)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Link href={`#`} key={cardKey} passHref>
      <a className={TeamCardStyles}>
        <div className="card-body">
          <h2 className="card-title w-full">{name}</h2>
          <div>Number of repositories: {data ? data.length : 0}</div>
        </div>
      </a>
    </Link>
  )
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}
