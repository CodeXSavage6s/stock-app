import Header from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
   <Header />   
    <main className="min-h-screen text-gray-400">
      <div className="container py-10">
        {children}
      </div>
    </main>
    </div>
    )
}