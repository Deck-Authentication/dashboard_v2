import { useAdminData, useGithubTeamRepos, useGithubTeamMembers } from "../../utils"
import Link from "next/Link"
import lodash from "lodash"

export default function Team({ BACKEND_URL }) {
  const { data, error } = useAdminData(`${BACKEND_URL}/admin/get-all-data`)

  if (error) return <div>{JSON.stringify(error)}</div>
  if (!data) return <div>loading...</div>

  const { teams } = data

  if (!teams || !lodash.isObject(teams) || Object.keys(teams).length === 0)
    return <div className="w-full">No teams found. Start adding team by importing from Github or input them manually.</div>

  return (
    <div className="team w-full flex justify-center items-center">
      <div className="mt-5 flex flex-row sm:justify-center xs:justify-center flex-wrap gap-4">
        {Object.keys(teams).map((teamId, loopId) => {
          const team = teams[teamId]
          return <TeamCard key={loopId} team={team} cardKey={loopId} BACKEND_URL={BACKEND_URL} />
        })}
      </div>
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

  const { repos, loadReposError } = useGithubTeamRepos(`${BACKEND_URL}/github/team/list-repos?teamSlug=${slug}`)
  const { members, loadMembersError } = useGithubTeamMembers(`${BACKEND_URL}/github/team/list-members?teamSlug=${slug}`)

  if (loadReposError) return <div>Failed to load repos</div>
  if (!repos) return <div>Loading...</div>

  if (loadMembersError) return <div>Failed to load team members</div>
  if (!members) return <div>Loading...</div>

  return (
    <Link href={`#`} key={cardKey}>
      <a className={TeamCardStyles}>
        <div className="card-body">
          <h2 className="card-title w-full">{name}</h2>
          <div>Number of repositories: {repos ? repos.length : 0}</div>
          <div>Number of members: {members ? members.length : 0}</div>
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
