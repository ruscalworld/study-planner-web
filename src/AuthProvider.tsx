import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStoredCredentials, inspectToken, refreshCredentials, storeCredentials } from './lib/api/core.ts'

function AuthProvider({ children }: { children: ReactNode | undefined }): ReactNode {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/auth/callback') return

    const credentials = getStoredCredentials()
    if (!credentials) {
      navigate('/auth/sign-in')
      return
    }

    const { requiresRefresh, canBeRefreshed } = inspectToken(credentials.accessToken)
    if (requiresRefresh && canBeRefreshed) {
      refreshCredentials().then(token => {
        storeCredentials(token)
        console.info('Successfully refreshed access token')
      }).catch(error => {
        console.error('Error refreshing access token', error)
      })

      return
    }

    if (requiresRefresh) {
      navigate('/auth/login')
      return
    }
  }, [])

  return children
}

export default AuthProvider
