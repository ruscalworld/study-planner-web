import useSWR from 'swr'
import { endpoint, fetcher, put } from './core.ts'

const profileEndpoint: string = '/profile'
const disciplineProgressEndpoint: string = '/disciplines/:disciplineId/progress'
const disciplineStatsEndpoint: string = '/disciplines/:disciplineId/stats'
const disciplineTaskProgressEndpoint: string = '/disciplines/:disciplineId/tasks/:taskId/progress'

export interface User {
  id: number,
  name: string,
  avatarUrl: string | null,
  platform: string,
  externalId: string | null,
  createdAt: string,
}

export function useProfile() {
  return useSWR<User>(endpoint(profileEndpoint, {}), fetcher)
}

export enum TaskStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  NeedsProtection = 'NeedsProtection',
  Completed = 'Completed'
}

export interface TaskProgress {
  status: TaskStatus,
  grade: string | null,
  startedAt: string | null,
  completedAt: string | null,
}

export interface ScopedTaskProgress extends TaskProgress {
  taskId: number,
  taskGroupId: number,
}

export function useDisciplineProgress(disciplineId: number) {
  return useSWR<ScopedTaskProgress[]>(endpoint(disciplineProgressEndpoint, { disciplineId }), fetcher)
}

export interface DisciplineStats {
  completedTasks: number,
  inProgressTasks: number,
  goalTasks: number,
  availableTasks: number,
  totalTasks: number,
}

export function useDisciplineStats(disciplineId: number) {
  return useSWR<DisciplineStats>(endpoint(disciplineStatsEndpoint, { disciplineId }), fetcher)
}

export interface TaskProgressPatch {
  status: TaskStatus,
  grade: string | null,
}

export async function updateTaskProgress(disciplineId: number, taskId: number, data: TaskProgressPatch) {
  return await put<TaskProgress, TaskProgressPatch>(endpoint(disciplineTaskProgressEndpoint, { disciplineId, taskId }), data)
}
