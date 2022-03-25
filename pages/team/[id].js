import { useGithubTeamRepos } from "../../utils"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Team({ id, BACKEND_URL }) {
  const teamSlug = id
  const router = useRouter()
  const { repos, loadReposError } = useGithubTeamRepos(`${BACKEND_URL}/github/team/list-repos?teamSlug=${teamSlug}`)
  const [tab, setTab] = useState(router.query.tab || "repositories")

  if (loadReposError) return <div>Failed to load repos</div>
  if (!repos) return <div>Loading...</div>

  const handleTabChange = (event, newTab) => {
    event.preventDefault()
    setTab(newTab)
  }

  return (
    <div className="team w-full h-full p-5">
      <h1 className="text-4xl font-bold mb-10">{teamSlug}</h1>
      <div className="tabs" data-theme="corporate">
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
      {tab === "repositories" ? <TeamRepos repos={repos} /> : <TeamMembers />}
    </div>
  )
}

function TeamRepos({ repos }) {
  return (
    <div>
      {repos.map((repo, loopId) => (
        <div key={loopId} className="w-full flex flex-row justify-between">
          <p>{repo.name}</p>
          <p>{repo.role_name}</p>
        </div>
      ))}
    </div>
  )
}

function TeamMembers({ members }) {
  return <div>members</div>
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
