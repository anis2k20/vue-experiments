import { ref } from 'vue'
import axios from 'axios'

/* ---------- Axios instance ---------- */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || window.location.origin,
  withCredentials: true,
})

/* ---------- Composable ---------- */
export function useApi() {
  const loading = ref(false);
  const error   = ref(null);

  async function request(method, url, payload = null, cfg = {}) {
    loading.value = true
    error.value   = null

    try {
      const { data } = await apiClient({ method, url, data: payload, ...cfg })
      return data
    } catch (err) {
      error.value = err.response?.data ?? err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /* Shorthand helpers */
  const get    = (url, cfg)         => request('get',    url, null, cfg)
  const post   = (url, data, cfg)   => request('post',   url, data, cfg)
  const put    = (url, data, cfg)   => request('put',    url, data, cfg)
  const patch  = (url, data, cfg)   => request('patch',  url, data, cfg)
  const del    = (url, cfg)         => request('delete', url, null, cfg)

  return { get, post, put, patch, del, loading, error }
}
