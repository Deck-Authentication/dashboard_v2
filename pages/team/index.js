import { useGithubTeams, createNewTeam } from "../../utils"
import { TeamCard, CreateTeamBtn } from "../../components/team"
import { useRouter } from "next/router"
import lodash from "lodash"
import { useState } from "react"

export default function Teams({ BACKEND_URL }) {
  const { teams, teamsLoadError } = useGithubTeams(`${BACKEND_URL}/github/team/list-all`)
  const [isCreatingTeam, setIsCreatingTeam] = useState(false)
  const router = useRouter()

  const handleCreateTeam = async (newTeamName) => {
    // disable the create team button while creating team
    setIsCreatingTeam(true)
    const newTeam = await createNewTeam(`${BACKEND_URL}/github/team/create`, newTeamName)
    setIsCreatingTeam(false)
    // redirect users to the new team page
    router.push(`${router.asPath}/${newTeam.slug}`)
  }

  if (teamsLoadError) {
    console.log(teamsLoadError)
    return <div>Error: {JSON.stringify(teamsLoadError)}</div>
  } else if (!teams) return <div>Loading...</div>

  return (
    <div className="teams w-full h-full flex flex-col items-center p-5">
      <CreateTeamBtn isCreating={isCreatingTeam} handleCreateTeam={handleCreateTeam} />
      {lodash.isArray(teams) && teams.length > 0 ? (
        <div className="mt-5 flex w-full justify-start items-start flex-wrap gap-8">
          {teams.map((team, loopId) => (
            <TeamCard
              cardKey={loopId}
              key={`${team.id}-${loopId}`}
              team={team}
              BACKEND_URL={BACKEND_URL}
              href={`${router.asPath}/${team.slug}`}
            />
          ))}
        </div>
      ) : (
        <div>No team found</div>
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
