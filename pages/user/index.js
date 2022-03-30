import { useGithubOrgMembers } from "../../utils"
import Link from "next/link"

export default function User({ BACKEND_URL }) {
  const { members, membersLoadingError } = useGithubOrgMembers(`${BACKEND_URL}/github/list-members`)

  if (membersLoadingError) return <div>{JSON.stringify(membersLoadingError)}</div>
  if (!members) return <div>loading...</div>

  if (!members || members.length === 0) return <div className="member">No members found</div>

  return (
    <div className="member px-8">
      <div className="border-b border-b-black my-8 ">
        <h1 className="text-4xl font-bold">User</h1>
      </div>
      <table className="table w-full table-zebra" data-theme="light">
        <thead>
          <tr className="hover:mix-blend-multiply">
            <th>ID</th>
            <th>Name</th>
            <th>Github Account</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(members).map((memberId, key) => {
            const member = members[memberId]
            return (
              <tr className="hover:mix-blend-multiply cursor-pointer" key={`${memberId}_${key}`}>
                <th>{key + 1}</th>
                <td>{member.login}</td>
                <td>{member.html_url}</td>
                <td className="flex flex-row gap-2">
                  {member.teams.map((team, id) => (
                    <Link key={id} href={`/team/${team}`} passHref>
                      <a className="p-2 border rounded-lg hover:bg-gray-200">{team}</a>
                    </Link>
                  ))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps() {
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080"

  return {
    props: {
      BACKEND_URL,
    },
  }
}
