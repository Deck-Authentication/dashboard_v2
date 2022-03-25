export default function Team({ id, BACKEND_URL }) {
  return (
    <div>
      <p>{id}</p>
      <p>{BACKEND_URL}</p>
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
