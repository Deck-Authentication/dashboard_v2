import { useAdminData, useGithubTeamRepos, useGithubTeamMembers } from "../../utils"
import Link from "next/Link"
import lodash from "lodash"
import { withRouter } from "next/router"

function Teams({ BACKEND_URL, router }) {
  const { data, error } = useAdminData(`${BACKEND_URL}/admin/get-all-data`)

  if (error) return <div>{JSON.stringify(error)}</div>
  if (!data) return <div>Loading...</div>

  const { teams } = data

  if (!teams || !lodash.isObject(teams) || Object.keys(teams).length === 0)
    return <div className="w-full">No teams found. Start adding team by importing from Github or input them manually.</div>

  return (
    <div className="team w-full flex flex-col justify-center items-center p-5">
      <CreateTeamBtn />
      <div className="mt-5 flex w-full justify-start items-start flex-wrap gap-8">
        {Object.keys(teams).map((teamId, loopId) => {
          const team = teams[teamId]
          return (
            <TeamCard
              key={loopId}
              team={team}
              cardKey={loopId}
              BACKEND_URL={BACKEND_URL}
              href={`${router.pathname}/${teamId}`}
            />
          )
        })}
      </div>
    </div>
  )
}

function TeamCard({ team, cardKey, BACKEND_URL, href }) {
  const { name, slug, id } = team
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
    <Link href={href} key={cardKey}>
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

function CreateTeamBtn({ isCreating }) {
  return (
    <div className="create-team-btn w-full flex">
      <label
        htmlFor="add-template-modal"
        className="modal-button btn btn-primary btn-sm cursor-pointer normal-case p-1 hover:opacity-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Create Team
      </label>
      <input type="checkbox" id="add-template-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white p-10">
          <input
            type="text"
            placeholder="Team Name"
            className="text-xl w-full rounded-2xl p-2 border border-blue-300"
            // value={newTemplateName}
            // onChange={(event) => setNewTemplateName(event.target.value)}
          />
          <div className="modal-action">
            <label
              htmlFor="add-template-modal"
              className={`btn btn-primary ${isCreating ? "loading" : ""}`}
              onClick={async (event) => {
                event.preventDefault()
                // setCreateButtonLoading(true)
                // await createTemplate(newTemplateName)
                // setCreateButtonLoading(false)
              }}
            >
              Create
            </label>
            <label htmlFor="add-template-modal" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}

export default withRouter(Teams)
