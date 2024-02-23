import { createContext, ElementType, useContext } from 'react'

export interface ModalProvider {
  openModal: (component: ElementType, options: any) => void
}

export const ModalContext = createContext<ModalProvider>({
  openModal() {}
})

export function useModalProvider(): ModalProvider {
  return useContext(ModalContext)
}
