import useSWR from 'swr'
import { endpoint, fetcher } from './core.ts'
import { Curriculum } from './curriculum.ts'

const institutionsEndpoint: string = '/institutions'
const institutionCurriculumsEndpoint: string = '/institutions/:institutionId/curriculums'

export interface Institution {
  id: number,
  name: string,
}

export function useInstitutions() {
  return useSWR<Institution[]>(endpoint(institutionsEndpoint, {}), fetcher)
}

export function useInstitutionCurriculums(institutionId: number) {
  return useSWR<Curriculum[]>(endpoint(institutionCurriculumsEndpoint, { institutionId }), fetcher)
}
