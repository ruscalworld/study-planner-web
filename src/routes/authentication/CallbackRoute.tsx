import { useEffect, useState } from 'react'
import LoadingBackdrop from '../../components/LoadingBackdrop.tsx'
import { signIn, storeCredentials } from '../../lib/api/core.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Backdrop } from '@mui/material'

function CallbackRoute() {
  const [ params ] = useSearchParams()
  const [ isLoading, setLoading ] = useState(true)
  const [ error, setError ] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    signIn({ code: params.get('code') })
      .then(token => {
        storeCredentials(token)
        navigate('/')
      })
      .catch(error => {
        console.error('Authentication error', error)
        setError(error.message ?? error)
      })
      .finally(() => setLoading(false))
  }, [ params ])

  if (isLoading) return <LoadingBackdrop/>

  if (error) return (
    <Backdrop open>
      <Alert severity='error'>{ error }</Alert>
    </Backdrop>
  )
}

export default CallbackRoute
