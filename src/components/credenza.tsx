"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface BaseProps {
  children: React.ReactNode
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CredenzaProps extends BaseProps {
  className?: string
  asChild?: true
}

const CredenzaContext = React.createContext<{ isMobile: boolean } | null>(null)

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext)
  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context"
    )
  }
  return context
}

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isMobile = useIsMobile()
  const _Credenza = isMobile ? Drawer : Dialog

  return (
    <CredenzaContext.Provider value={{ isMobile }}>
      <_Credenza {...props} {...(isMobile && { autoFocus: true })}>
        {children}
      </_Credenza>
    </CredenzaContext.Provider>
  )
}

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const _CredenzaTrigger = isMobile ? DrawerTrigger : DialogTrigger

  return (
    <_CredenzaTrigger className={className} {...props}>
      {children}
    </_CredenzaTrigger>
  )
}

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const _CredenzaClose = isMobile ? DrawerClose : DialogClose

  return (
    <_CredenzaClose className={className} {...props}>
      {children}
    </_CredenzaClose>
  )
}

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const _CredenzaContent = isMobile ? DrawerContent : DialogContent

  return (
    <_CredenzaContent className={className} {...props}>
      {children}
    </_CredenzaContent>
  )
}

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const _CredenzaDescription = isMobile ? DrawerDescription : DialogDescription

  return (
    <_CredenzaDescription className={className} {...props}>
      {children}
    </_CredenzaDescription>
  )
}

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const _CredenzaHeader = isMobile ? DrawerHeader : DialogHeader

  return (
    <_CredenzaHeader className={className} {...props}>
      {children}
    </_CredenzaHeader>
  )
}

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const _CredenzaTitle = isMobile ? DrawerTitle : DialogTitle

  return (
    <_CredenzaTitle className={className} {...props}>
      {children}
    </_CredenzaTitle>
  )
}

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  )
}

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const _CredenzaFooter = isMobile ? DrawerFooter : DialogFooter

  return (
    <_CredenzaFooter className={className} {...props}>
      {children}
    </_CredenzaFooter>
  )
}

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
}
