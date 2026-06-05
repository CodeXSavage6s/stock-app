"use client"

import Link from 'next/link'
import Image from 'next/image'
import NavItems from '@/components/NavItems'
import UserDropdown from '@/components/userdropdown'

export default function Header() {
  return (
    <header className="sticky top-0 justify-around flex items-center header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image src="icons/logo.svg" alt="logo" width={142} height={32} className="h-8 w-auto cursor-pointer"/>
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        <UserDropdown />
      </div>
    </header>
    )
}