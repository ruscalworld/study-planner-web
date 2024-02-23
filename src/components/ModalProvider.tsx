import { ElementType, Fragment, ReactNode, useEffect, useState } from 'react'
import { ModalContext } from '../lib/modals.ts'

interface ModalOptions {
  component: ElementType | null,
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [ open, setOpen ] = useState(false)
  const [ options, setOptions ] = useState<ModalOptions>({ component: null })

  function openModal(component: ElementType, options: any) {
    setOptions({ component, ...options })
  }

  useEffect(() => {
    if (options.component) setOpen(true)
  }, [ options ])

  useEffect(() => {
    if (!open) setTimeout(() => setOptions({ component: null }), 500)
  }, [ open ])

  const Component = options.component ?? Fragment

  function onClose() {
    setOpen(false)
  }

  return (
    <ModalContext.Provider value={{ openModal }}>
      { <Component { ...(Component !== Fragment ? { ...options, open, setOpen, onClose } : {}) }/> }
      { children }
    </ModalContext.Provider>
  )
}

export default ModalProvider
