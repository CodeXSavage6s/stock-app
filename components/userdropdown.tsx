"use client"

import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import NavItems from '@/components/NavItems'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {signOut} from "@/lib/actions/auth.actions";
import {LogOut} from "lucide-react";

const UserDropdown = ({user}: {user: User}) => {
  const router = useRouter()
  
  const handleSignout = async () => {
    await signOut()
    router.push("/sign-in")
  }
  
  //const user = {
  //  name: "savage", email: "savage@gmail.com"
  //}
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 text-gray-400 hover:text-yellow-500">
          <Avatar>
            <AvatarImage src="http://github.com/shadcn.svg" />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-3">
          <Avatar>
            <AvatarImage src="http://github.com/shadcn.svg" />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600"/>
      <DropdownMenuItem onClick={handleSignout} className="text-gray-400 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
        
        <LogOut className="h-4 w-4 hidden sm:block" />
        
        logout
      </DropdownMenuItem>
        <DropdownMenuSeparator className="hidden sm:block bg-gray-600"/>
      <nav className="sm:hidden">
        <NavItems />
      </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown