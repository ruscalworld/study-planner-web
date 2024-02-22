import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

const client = makeClient()

function makeClient(): AxiosInstance {
  const newClient = axios.create({
    baseURL: localStorage.getItem('base-url') ?? 'http://127.0.0.1:8080/v1',
  })

  newClient.interceptors.request.use(async (config) => {
    const authHeaders = getAuthorizationHeaders()
    config.headers = config.headers.concat(authHeaders)
    return config
  })

  return newClient
}

function getAuthorizationHeaders(): { [key: string]: any } {
  const credentials = getStoredCredentials()
  if (!credentials) return {}
  const { tokenType, accessToken } = credentials

  return {
    'Authorization': `${ tokenType } ${ accessToken }`,
  }
}

export type Params = { [key: string]: any }

async function get<T>(endpoint: string): Promise<T> {
  const response = await client.get<T>(endpoint)
  return processResponse(response)
}

export async function put<T, R>(endpoint: string, data: R): Promise<T> {
  const response = await client.put<T>(endpoint, data)
  return processResponse(response)
}

export function fetcher<T>(endpoint: string): Promise<T> {
  return get(endpoint)
}

export function endpoint(endpoint: string, params: Params): string {
  for (const [ key, value ] of Object.entries(params)) {
    endpoint = endpoint.replace(`:${ key }`, encodeURIComponent(value))
  }

  return endpoint
}

export interface Error {
  message: string,
}

function processResponse<T>(response: AxiosResponse<T, any>): T {
  if (response.status >= 400) {
    throw response.data as Error
  }

  return response.data
}

export interface TokenInspectionResult {
  requiresRefresh: boolean,
  canBeRefreshed: boolean,
}

export function inspectToken(accessToken: string): TokenInspectionResult {
  const parts = accessToken.split('.')
  if (parts.length !== 3) return { requiresRefresh: true, canBeRefreshed: false }

  let issuedAt
  let expiresAt
  try {
    // noinspection JSUnresolvedReference
    const payloadString = Utf8.stringify(Base64.parse(parts[1]))
    const payload = JSON.parse(payloadString)
    expiresAt = payload['exp']
    issuedAt = payload['iat']
  } catch (e) {
    return { requiresRefresh: true, canBeRefreshed: false }
  }

  // Consider token requires refresh if more than 1/7 of its lifetime passed already
  const lifetime = expiresAt - issuedAt
  const now = new Date().getTime() / 1000
  return { requiresRefresh: now > issuedAt + lifetime / 7, canBeRefreshed: true }
}

export interface Token {
  accessToken: string,
  tokenType: string,
}

export function getStoredCredentials(): Token | null {
  const accessToken = localStorage.getItem('access-token')
  const tokenType = localStorage.getItem('token-type')
  if (!accessToken || !tokenType) return null

  return { accessToken, tokenType }
}

export function storeCredentials(credentials: Token) {
  localStorage.setItem('access-token', credentials.accessToken)
  localStorage.setItem('token-type', credentials.tokenType)
}

export interface AuthenticationConfig {
  authenticationUrl: string,
}

export async function getAuthenticationConfig(): Promise<AuthenticationConfig> {
  const response = await client.get<AuthenticationConfig>('/auth/config')
  return response.data
}

export async function signIn(params: any): Promise<Token> {
  const response = await client.post<Token>('/auth/sign-in', params)
  return response.data
}

export async function refreshCredentials(): Promise<Token> {
  const response = await client.post<Token>('/auth/refresh')
  return response.data
}

