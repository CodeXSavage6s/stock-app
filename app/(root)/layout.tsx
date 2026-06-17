import Header from '@/components/header'
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({ headers: await headers() });
<<<<<<< HEAD
=======
    
    //console.log("SESSION", JSON.stringify(session, null, 2))
>>>>>>> d09b210 (setup watchlist page)

    if(!session?.user) redirect('/sign-in');

    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }
    
  return (
    <div>
   <Header user={user}/>   
    <main className="min-h-screen text-gray-400">
      <div className="container py-10">
        {children}
      </div>
    </main>
    </div>
    )
}