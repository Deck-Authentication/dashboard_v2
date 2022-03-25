import { useGithubOrgActivities } from "../utils"

export default function Activity({ BACKEND_URL }) {
  const { activities, loadActivitiesError } = useGithubOrgActivities(`${BACKEND_URL}/github/list-activities?perPage=100`)

  if (loadActivitiesError) return <div>Error loading activities</div>
  else if (!activities) return <div>Loading activities...</div>

  return (
    <div className="activities p-5">
      <ul>
        {activities.map((activity, loopId) => (
          <li key={loopId} className="border border-gray-300 p-2">
            <p>
              {activity.actor} did {activity.action} | timestamp {activity.created_at}
              {activity.actor
                ? `| location: ${
                    activity.actor_location ? activity.actor_location.country_code : "automatically triggered action"
                  }`
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}
