import { useState } from 'react';
import { MagnifyingGlass, XCircle } from 'phosphor-react';

import Head from 'next/head'
import Link from 'next/link'
import Meta from './meta';
import { Router, useRouter } from 'next/router';

type Props = {
  preview?: boolean
  children: React.ReactNode
  // handleOnEnterInSearchBox: (searchWord: string) => void
}

const Layout = ({ preview, children }: Props) => {
  const [isFullDisplaySearchBox, setIsFullDisplaySearchBox] = useState<boolean>(false)

  const handleOnClickSearch = () => {
    setIsFullDisplaySearchBox(!isFullDisplaySearchBox)
  }

  const router = useRouter()

  return (
    <>
      <Meta />
      <Head>
        <title>CryptoClips</title>
      </Head>
      <div className="bg-white">
        {
          isFullDisplaySearchBox ?
            <div className='relative p-5 flex' >
              <MagnifyingGlass className='absolute top-0 bottom-0 m-auto left-7 text-slate-400' width="20px" height="20px" />
              <input className="appearance-none border rounded w-full py-2 px-3 pl-[25px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  router.push(`/search?q=${(e.target as HTMLInputElement).value}`)
                  // handleOnEnterInSearchBox((e.target as HTMLInputElement).value)
                }
              }} />
              <div className='flex items-center cursor-pointer' onClick={handleOnClickSearch}>
                <XCircle className='pl-2 text-slate-400' width="40px" height="20px" />
              </div>
            </div>
            :
            <div className='p-5 flex justify-between'>
              <Link href={'/'}><a className="text-2xl font-extrabold tracking-tight text-gray-900 block pr-1">CryptoClips</a></Link>
              <div className='relative hidden sm:block'>
                <MagnifyingGlass className='absolute top-0 bottom-0 m-auto left-1 text-slate-400' width="20px" height="20px" />
                <input onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    // handleOnEnterInSearchBox((e.target as HTMLInputElement).value)
                    router.push(`/search?q=${(e.target as HTMLInputElement).value}`)
                  }
                }} className="appearance-none border rounded w-full py-2 px-3 pl-[25px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
              </div>
              <div className="block sm:hidden flex items-center cursor-pointer" onClick={handleOnClickSearch}>
                <MagnifyingGlass className='text-slate-400' width="20px" height="20px" />
              </div>
            </div>
        }
        <div className="max-w-2xl mx-auto py-6 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
