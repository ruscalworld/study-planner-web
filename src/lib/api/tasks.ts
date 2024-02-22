import useSWR from 'swr'
import { endpoint, fetcher } from './core.ts'

const tasksEndpoint: string = '/disciplines/:disciplineId/tasks'
const taskLinksEndpoint: string = '/disciplines/:disciplineId/tasks/:taskId/links'
const taskGroupsEndpoint: string = '/disciplines/:disciplineId/groups'

export enum TaskStatus {
  NotPublished = 'NotPublished',
  Available = 'Available',
}

export interface Task {
  id: number,
  name: string,
  externalName: string | null,
  description: string | null,
  groupId: number,
  status: TaskStatus | null,
  difficulty: number,
  deadline: string | null,
}

export interface TaskGroup {
  id: number,
  name: string,
}

export interface Link {
  id: number,
  name: string,
  url: string,
}

export function useTasks(disciplineId: number) {
  return useSWR<Task[]>(endpoint(tasksEndpoint, { disciplineId }), fetcher)
}

export function useTaskGroups(disciplineId: number) {
  return useSWR<TaskGroup[]>(endpoint(taskGroupsEndpoint, { disciplineId }), fetcher)
}

export function useTaskLinks(disciplineId: number, taskId: number) {
  return useSWR<Link[]>(endpoint(taskLinksEndpoint, { disciplineId, taskId }), fetcher)
}
