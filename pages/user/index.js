import { useAdminData } from "../../utils"

export default function User({ BACKEND_URL }) {
  const { data, error } = useAdminData(`${BACKEND_URL}/admin/get-all-data`)

  if (error) return <div>{JSON.stringify(error)}</div>
  if (!data) return <div>loading...</div>

  const { members } = data

  if (!members || members.length === 0) return <div className="member">No members found</div>

  return (
    <div className="member">
      <table className="table w-full table-zebra" data-theme="light">
        <thead>
          <tr className="hover:mix-blend-multiply cursor-pointer">
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
                <td></td>
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
