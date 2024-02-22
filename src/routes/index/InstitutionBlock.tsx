import { Institution, useInstitutionCurriculums } from '../../lib/api/institution.ts'
import { Box, CircularProgress, List, Typography } from '@mui/material'
import ErrorContainer from '../../components/ErrorContainer.tsx'
import CurriculumEntry from './CurriculumEntry.tsx'

function InstitutionBlock({ institution }: { institution: Institution }) {
  return (
    <Box>
      <Typography variant='h4'>{ institution.name }</Typography>
      <CurriculumList institution={ institution }/>
    </Box>
  )
}

function CurriculumList({ institution }: { institution: Institution }) {
  const { data: curriculums, error } = useInstitutionCurriculums(institution.id)

  if (!curriculums && !error) return <CircularProgress/>
  if (error) return <ErrorContainer title='Не удалось загрузить список учебных планов' message={ error.message ?? error }/>

  return (
    <List>
      { curriculums?.map(curriculum => <CurriculumEntry curriculum={ curriculum } key={ curriculum.id }/>) }
    </List>
  )
}

export default InstitutionBlock
