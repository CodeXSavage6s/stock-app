import Link from 'next/link'
import Image from 'next/image'
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";



export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const authInstance = await auth;

  const session = await authInstance.api.getSession({
    headers: await headers()
  });
  
  if(session?.user) redirect('/')
    
  return (
    <div>
    <main className="auth-layout">
        <section className="auth-left-section">
          <div className="my-2">
            <Link href="/">
              <Image src="/icons/logo.svg" alt="logo" width={145} height={45} />
            </Link>
          </div>
          <div>
            {children}
          </div>
        </section>
        <section className="auth-right-section">
          <div className="z-10 relative">
            <blockquote className="auth-blockquote">
                        Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author">- Code X S.</cite>
                            <p className="max-md:text-xs text-gray-500">Retail Investor</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image src="/icons/star.svg" alt="Star" key={star} width={20} height={20} className="w-5 h-5" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <Image src="/images/dashboard.png" alt="Dashboard Preview" width={1440} height={1150} className="auth-dashboard-preview absolute top-0" />
          </div>
        </section>
    </main>
    </div>
    )
}