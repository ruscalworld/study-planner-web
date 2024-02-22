import LoadingBackdrop from '../../components/LoadingBackdrop.tsx'
import { useInstitutions } from '../../lib/api/institution.ts'
import CenteredContainer from '../../components/CenteredContainer.tsx'
import ErrorContainer from '../../components/ErrorContainer.tsx'
import InstitutionBlock from './InstitutionBlock.tsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLastCurriculumId } from '../../lib/memory.ts'

function IndexRoute() {
  return (
    <CenteredContainer>
      <InstitutionList/>
    </CenteredContainer>
  )
}

function InstitutionList() {
  const { data: institutions, error } = useInstitutions()
  const navigate = useNavigate()

  useEffect(() => {
    const lastCurriculumId = getLastCurriculumId()
    if (lastCurriculumId) navigate(`/curriculums/${ lastCurriculumId }`)
  }, [])

  if (!institutions && !error) return <LoadingBackdrop/>
  if (error) return <ErrorContainer title='Не удалось загрузить список учебных заведений' message={ error.message ?? error }/>

  return institutions?.map(institution => <InstitutionBlock institution={ institution } key={ institution.id }/>)
}

export default IndexRoute
