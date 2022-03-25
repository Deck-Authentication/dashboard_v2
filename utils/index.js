import useSWR from "swr"
import axios from "axios"

export async function getAccessToken() {
  const { accessToken } = await axios
    .get("/api/get-access-token")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
      throw new Error(err)
    })
  return accessToken
}

export function useSlackConversations(url = "") {
  const fetchConversation = async (url) => {
    const accessToken = await getAccessToken()
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      // slack conversations returned from backend
      .then((res) => res.data.conversations)
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }
  const { data, error } = useSWR(url, fetchConversation)

  return {
    conversations: data,
    areConversationsLoading: !data,
    areConversationsFailed: error,
  }
}

export function useGoogleGroups(url = "") {
  const fetchGoogleGroups = async (url) => {
    const accessToken = await getAccessToken()
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      // google groups returned from backend
      .then((res) => res.data.groups)
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }
  const { data, error } = useSWR(url, fetchGoogleGroups)

  return {
    groups: data,
    areGroupsLoading: !data,
    areGroupsFailed: error,
  }
}

export function useTemplate(url = "") {
  const fetchTemplates = async (url) => {
    const accessToken = await getAccessToken()
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      // template returned from backend
      .then((res) => res.data.message)
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }
  const { data, error } = useSWR(url, fetchTemplates)

  return {
    template: data,
    isTemplateLoading: !data,
    isTemplateError: error,
  }
}

export function useAtlassianGroups(url = "") {
  const fetchAtlassianGroups = async (url) => {
    const accessToken = await getAccessToken()
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      // google groups returned from backend
      .then((res) => res.data.groups)
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }
  const { data, error } = useSWR(url, fetchAtlassianGroups)

  return {
    atlassianGroups: data,
    areGroupsLoading: !data,
    areGroupsFailed: error,
  }
}

export function useUsers(url = "") {
  const fetchUers = async (_url) => {
    const accessToken = await getAccessToken()
    return await axios
      .get(_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data.users)
  }

  const { data, error } = useSWR(url, fetchUers)

  return {
    users: data,
    areUsersBeingLoaded: !data,
    isUsersLoadingFailed: error,
  }
}

export function useAdminData(url = "") {
  const fetcher = async (url) => {
    const accessToken = await getAccessToken()
    return await axios.get(`${url}`, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => res.data.admin)
  }

  return useSWR(url, fetcher)
}

export async function saveGithubCredentials(url = "", apiKey = "", organization = "") {
  const accessToken = await getAccessToken()
  const result = await axios
    .post(url, { apiKey, organization }, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((res) => res.data)

  if (!result?.ok) throw new Error(result?.message)

  return result
}

export async function importNewData(url = "") {
  const accessToken = await getAccessToken()
  const result = await axios.put(url, {}, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => res.data)

  if (!result?.ok) throw new Error(result?.message)

  return result
}

// fetch all the repositories of a team from github
export function useGithubTeamRepos(url = "") {
  const fetcher = async (url) => {
    const accessToken = await getAccessToken()
    return await axios.get(`${url}`, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => res.data.repos)
  }
  const { data, error } = useSWR(url, fetcher)

  return {
    repos: data,
    loadReposError: error,
  }
}

export function useGithubTeamMembers(url = "") {
  const fetcher = async (url) => {
    const accessToken = await getAccessToken()
    return await axios.get(`${url}`, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => {
      if (!res.data.ok) throw new Error(res.data.message)
      return res.data.members
    })
  }
  const { data, error } = useSWR(url, fetcher)

  return {
    members: data,
    loadMembersError: error,
  }
}
