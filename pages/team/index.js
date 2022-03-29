import { useGithubTeams, createNewTeam, deleteTeam } from "../../utils"
import { TeamCard, CreateTeamBtn } from "../../components/team"
import { useRouter } from "next/router"
import lodash from "lodash"
import { useState, useRef } from "react"
import { toast } from "react-toastify"
import { toastOption } from "../../constants"

export default function Teams({ BACKEND_URL }) {
  const { teams, teamsLoadError } = useGithubTeams(`${BACKEND_URL}/github/team/list-all`)
  const [isCreatingTeam, setIsCreatingTeam] = useState(false)
  const [isDeletingTeam, setIsDeletingTeam] = useState(false)
  const router = useRouter()
  const modalDeleteCheckbox = useRef(null)

  const handleCreateTeam = async (newTeamName) => {
    // disable the create team button while creating team
    setIsCreatingTeam(true)
    const newTeam = await createNewTeam(`${BACKEND_URL}/github/team/create`, newTeamName)
    setIsCreatingTeam(false)
    // redirect users to the new team page
    router.push(`${router.asPath}/${newTeam.slug}`)
  }
  const handleDeleteTeam = async (team) => {
    setIsDeletingTeam(true)
    await deleteTeam(`${BACKEND_URL}/github/team/delete`, team.slug)
    setIsDeletingTeam(false)
    router.reload()
    toast.success(`Team ${team.name} deleted successfully`, toastOption)
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
              handleDeleteTeam={handleDeleteTeam}
            />
          ))}
          <input type="checkbox" id="delete-card-checkbox" className="modal-toggle" ref={modalDeleteCheckbox} />
          <div className="modal">
            <div className="modal-box bg-white p-10">
              <input type="text" placeholder="Team Name" className="text-xl w-full rounded-2xl p-2 border border-blue-300" />
              <div className="modal-action">
                <label
                  htmlFor="delete-card-checkbox"
                  className={`btn btn-primary`}
                  onClick={async (event) => {
                    event.preventDefault()
                  }}
                >
                  Create
                </label>
                <label htmlFor="delete-card-checkbox" className="btn">
                  Cancel
                </label>
              </div>
            </div>
          </div>
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
