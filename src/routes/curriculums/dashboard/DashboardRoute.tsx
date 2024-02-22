import { Box, Container } from '@mui/material'
import Header from './Header.tsx'
import DisciplineTable from './DisciplineTable.tsx'
import { useParams } from 'react-router-dom'
import { useCurriculum, useDisciplines } from '../../../lib/api/curriculum.ts'
import LoadingBackdrop from '../../../components/LoadingBackdrop.tsx'
import ErrorContainer from '../../../components/ErrorContainer.tsx'
import { useEffect } from 'react'
import { rememberCurriculumId } from '../../../lib/memory.ts'

function DashboardRoute() {
  const { curriculumId } = useParams()
  const { data: curriculum, error: curriculumError } = useCurriculum(Number(curriculumId))
  const { data: disciplines, error: disciplinesError } = useDisciplines(Number(curriculumId))

  useEffect(() => {
    if (curriculum) rememberCurriculumId(curriculum.id)
  }, [ curriculum ])

  if (!disciplines && !disciplinesError || !curriculum && !curriculumError) return <LoadingBackdrop/>

  return (
    <>
      { curriculum && (
        <Container maxWidth='md'>
          <Header semester={ curriculum.semester } curriculumName={ curriculum.name }/>
        </Container>
      )}
      <Box sx={{ overflowX: 'scroll', padding: '0 128px', width: '100%' }}>
        { disciplinesError && <ErrorContainer message={ disciplinesError.message } title='Не удалось загрузить дисциплины'/> }
        { curriculumError && <ErrorContainer message={ curriculumError.message } title='Не удалось загрузить учебный план'/> }

        { disciplines?.map(discipline => (
          <DisciplineTable key={ discipline.id } discipline={ discipline }/>
        )) }
      </Box>
    </>
  )
}

export default DashboardRoute
