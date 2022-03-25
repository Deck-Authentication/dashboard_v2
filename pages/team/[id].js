import { useGithubTeamRepos, useGithubTeamMembers } from "../../utils"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Team({ id, BACKEND_URL }) {
  const teamSlug = id
  const router = useRouter()
  const { repos, loadReposError } = useGithubTeamRepos(`${BACKEND_URL}/github/team/list-repos?teamSlug=${teamSlug}`)
  const { members, loadMembersError } = useGithubTeamMembers(`${BACKEND_URL}/github/team/list-members?teamSlug=${teamSlug}`)
  const [tab, setTab] = useState(router.query.tab || "repositories")

  if (loadReposError) return <div>Failed to load repos</div>
  else if (loadMembersError) return <div>Failed to load members</div>
  if (!repos || !members) return <div>Loading...</div>

  const handleTabChange = (event, newTab) => {
    event.preventDefault()
    setTab(newTab)
  }

  return (
    <div className="team w-full h-full p-5">
      <h1 className="text-4xl font-bold mb-10">{teamSlug}</h1>
      <div className="tabs my-4" data-theme="corporate">
        {["repositories", "members"].map((_tab, loopId) => (
          <a
            key={`${_tab}-${loopId}`}
            className={`capitalize tab tab-bordered ${_tab === tab ? "font-bold border-orange-600" : ""}`}
            onClick={(e) => handleTabChange(e, _tab)}
          >
            {_tab}
          </a>
        ))}
      </div>
      {tab === "repositories" ? <TeamRepos repos={repos} /> : <TeamMembers members={members} />}
    </div>
  )
}

function TeamRepos({ repos }) {
  return (
    <table className="w-full border-collapse" data-theme="light">
      <thead className="border-2 border-black p-2">
        <tr>
          <th className="text-left p-2">Name</th>
          <th className="text-left p-2">Role</th>
        </tr>
      </thead>
      {repos.map((repo, loopId) => (
        <tbody key={loopId} className="w-full border-2 border-black p-2">
          <tr className="w-full border border-black rounded-lg">
            <td className="p-2">{repo.name}</td>
            <td className="p-2">{repo.role_name}</td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}

function TeamMembers({ members }) {
  return (
    <div>
      {members.map((member, key) => (
        <p key={key}>{member.login}</p>
      ))}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080"
  const id = params.id
  return {
    props: {
      id,
      BACKEND_URL,
    },
  }
}
