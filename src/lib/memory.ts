export function rememberCurriculumId(curriculumId: number) {
  localStorage.setItem('last-curriculum-id', String(curriculumId))
}

export function forgetCurriculumId() {
  localStorage.removeItem('last-curriculum-id')
}

export function getLastCurriculumId(): number | null {
  const value = localStorage.getItem('last-curriculum-id')
  if (!value) return null
  return Number(value)
}
