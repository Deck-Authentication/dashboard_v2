export default function Team({ BACKEND_URL }) {
  return <div>Team</div>
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}
