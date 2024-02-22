import { useEffect } from 'react'
import LoadingBackdrop from '../../components/LoadingBackdrop.tsx'
import { getAuthenticationConfig } from '../../lib/api/core.ts'

function SignInRoute() {
  useEffect(() => {
    getAuthenticationConfig().then(config => {
      window.location.href = config.authenticationUrl
    })
  }, [])

  return <LoadingBackdrop/>
}

export default SignInRoute
