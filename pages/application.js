// FontAwesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Github_Mark from "../assets/Github_Mark.png"
import Image from "next/image"
import { useAdminData } from "../utils"
import { useState } from "react"

export default function Application({ BACKEND_URL }) {
  const { data, error } = useAdminData(`${BACKEND_URL}/admin/get-all-data`)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const { github } = data

  const saveGithubApiKey = () => {}

  const isGithubApiKeyValid = async (apiKey) => {}

  return (
    <div id="application" className="w-full h-full flex justify-center p-10">
      <ul className="w-10/12 w-md-full flex flex-col gap-y-4">
        <li className="w-full border rounded-sm border-gray-300 p-3 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-1" title="github">
            <Image src={Github_Mark} alt="Github logo" height="25" width="25" />
            <p>Github</p>
          </div>
          <label
            htmlFor="my-modal-4"
            className="rounded-lg py-1 px-2 border border-transparent hover:shadow-md hover:border-gray-300 cursor-pointer"
            title="Setting"
          >
            <FontAwesomeIcon icon={faCog} width="20" height="20" />
          </label>
        </li>
      </ul>
      <AppSettings header="Github App Setting" label="my-modal-4" github={github} />
    </div>
  )
}

function AppSettings({ header, label, github }) {
  const { apiKey, organization } = github
  // the temporary API key inputted by user that must be validated
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  // the temporary organization inputted by user that must be saved to our database
  const [tempOrganization, setTempOrganization] = useState(organization)
  // Initially, if the apiKey doesn't exist in the database,
  // then the tempApiKey is not valid as it's initially set as the apiKey from the database
  const [isTempApiKeyValid, setIsTempApiKeyValid] = useState(apiKey !== "")

  return (
    <div data-theme="corporate">
      <input type="checkbox" id={label} className="modal-toggle" />
      <label htmlFor={label} className="modal cursor-pointer">
        <label className="modal-box relative p-0" htmlFor="" style={{ minWidth: "1000px" }}>
          <div className="modal-header text-xl font-bold p-4 w-full flex flex-row justify-between">
            <h3>{header}</h3>
            <label htmlFor={label} className="cursor-pointer">
              <FontAwesomeIcon icon={faTimes} width="25" height="25" />
            </label>
          </div>
          <div className="modal-body w-full p-4 border-y flex flex-col gap-y-2 ">
            <div className="w-full bg-gray-200 p-4 rounded-sm flex flex-col gap-y-2" data-theme="corporate">
              <h4 className="font-semibold">Instructions</h4>
              <p>
                To get your personal access token, click onto the{" "}
                <i className="text-green-400 font-semibold">Get your Credentials</i> button below and create a new token.
                <br />
                Your token must include the <i className="text-green-400 font-semibold">admin:org</i> scope and should be
                expired in one year.
              </p>
              <a
                className="btn w-full hover:opacity-80"
                href="https://github.com/settings/tokens/new"
                target="_blank"
                rel="noreferrer"
              >
                Get Your Credentials
                <FontAwesomeIcon icon={faArrowRight} width="20" height="20" className="ml-1" />
              </a>
              <a className="btn btn-info w-full hover:opacity-80">Watch a guide video</a>
            </div>
            <div className="flex flex-col gap-1 text-lg">
              <label htmlFor="github-api-key">
                API key<span className="text-red-600">*</span>
              </label>
              <div className="flex flex-row gap-x-4">
                <input
                  name="github-api-key"
                  id="github-api-key"
                  className="rounded-sm p-1 grow border-2 border-gray-400"
                  value={tempApiKey}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-lg">
              <label htmlFor="github-org">
                Organization<span className="text-red-600">*</span>
              </label>
              <div className="flex flex-row gap-x-4">
                <input
                  name="github-org"
                  id="github-org"
                  className="rounded-sm p-1 grow border-2 border-gray-400"
                  value={tempOrganization}
                  required
                />
              </div>
            </div>
            <div className="alert alert-warning shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  Warning: Picking a new organization will reload your Github teams under the Team tab. Make sure your
                  configurations are accurate.
                </span>
              </div>
            </div>
          </div>
          <div className="w-full p-4 flex flex-row justify-end">
            <button className="btn btn-primary text-white">Save</button>
          </div>
        </label>
      </label>
    </div>
  )
}

export async function getStaticProps() {
  const BACKEND_URL = process.env.BACKEND_URL

  return {
    props: { BACKEND_URL },
  }
}
