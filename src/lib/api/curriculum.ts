import useSWR from 'swr'
import { endpoint, fetcher } from './core.ts'

const curriculumEndpoint: string = '/curriculums/:curriculumId'
const disciplinesEndpoint: string = '/curriculums/:curriculumId/disciplines'
const disciplineLinksEndpoint: string = '/disciplines/:disciplineId/links'

export interface Curriculum {
  id: number,
  name: string,
  semester: number,
}

export interface Curriculum {
  id: number,
  name: string,
}

export interface Link {
  id: number,
  name: string,
  url: string,
}

export function useCurriculum(curriculumId: number) {
  return useSWR<Curriculum>(endpoint(curriculumEndpoint, { curriculumId }), fetcher)
}

export function useDisciplines(curriculumId: number) {
  return useSWR<Curriculum[]>(endpoint(disciplinesEndpoint, { curriculumId }), fetcher)
}

export function useDisciplineLinks(disciplineId: number) {
  return useSWR<Link[]>(endpoint(disciplineLinksEndpoint, { disciplineId }), fetcher)
}
