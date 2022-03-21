// FontAwesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons"
import Github_Mark from "../assets/Github_Mark.png"
import Image from "next/image"
import { useState } from "react"

export default function Application() {
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
      <AppSettings
        header="Github App Setting"
        content="You've been selected for a chance to get one year of subscription to use Wikipedia for free!"
        label="my-modal-4"
      />
    </div>
  )
}

function AppSettings({ header, content, label }) {
  return (
    <div data-theme="corporate">
      <input type="checkbox" id={label} className="modal-toggle" />
      <label htmlFor={label} className="modal cursor-pointer">
        <label className="modal-box relative p-0" htmlFor="">
          <div className="modal-header text-xl font-bold p-4 w-full flex flex-row justify-between">
            <h3>{header}</h3>
            <label htmlFor={label} className="cursor-pointer">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </label>
          </div>
          <div className="modal-body w-full p-4 bg-gray-200">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <a>Credentials</a>
                </li>
                <li>
                  <a>Select an Organization</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-row gap-x-4 text-lg">
              <input placeholder="API key" className="rounded-sm p-1 grow" />
              <button className="btn btn-md btn-primary text-white rounded-sm capitalize flex-none">Validate</button>
            </div>
          </div>
          <div className="w-full p-4">Footer</div>
        </label>
      </label>
    </div>
  )
}
