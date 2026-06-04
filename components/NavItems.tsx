import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'

export default function NavItems() {
  const pathname = usePathname()

  return (
    <ul className="flex flex-col sm:flex-row gap-3 p-2 sm:p-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => {
        const isActive = pathname === href 

        return (
          <li key={href}>
            <Link 
              href={href} 
              className={`hover:text-yellow-400 ${
                isActive ? "text-gray-200" : "text-gray-400"
              }`}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
