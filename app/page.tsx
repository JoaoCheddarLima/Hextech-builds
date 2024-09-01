'use client';

import {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';

import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const [accountName, setAccountName] = useState("");
  const [examplePlaceHolder, setExamplePlaceHolder] = useState("Champion name");
  const [region, setRegion] = useState("br");	// Default region is Brazil

  useEffect(() => {
    const LeagueFamousChampions = [
      'yasuo',
      'zed',
      'katarina',
      'akali',
      'leesin',
      'irelia',
      'darius',
      'garen',
      'jhin',
      'kaisa',
      'vayne',
      'lucian'
    ]

    const pickRandomChampion = () => LeagueFamousChampions[Math.random() * LeagueFamousChampions.length | 0];

    const int = setInterval(() => {
      setExamplePlaceHolder(pickRandomChampion());
    }, 1200)

    return () => {
      clearInterval(int);
    }
  })

  const handleSearch = () => {
    console.log('searching for account:', accountName);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 font-mono gap-10">
      <div>
        <h1 className="flex text-center text-6xl font-bold items-center justify-center">
          <Image
            src={'/logo.png'}
            alt='logo'
            width={72}
            height={72}
          />
          <div className='flex'>
            HEX
            <p className='text-orange-500'>
              TECH
            </p>
          </div>
        </h1>
        <p className="text-center text-sm italic text-[#a8a8a8]">
          See data {accountName ? `for ${accountName}` : ''} with actual meaning
        </p>
      </div>
      <div className='flex gap-2 text-center'>
        <form action={handleSearch} method="get">
          <input type="text" name="account_name" id="account_name" placeholder={examplePlaceHolder} required
            className='text-black border-2 border-black rounded-lg p-2'
            onChange={
              (e) => {
                setAccountName(e.target.value);
              }
            }
          />
          {
            accountName && (
              <Link href={`/summary?champion=${accountName}`}>
                <button className='bg-black text-white rounded-lg p-2'>
                  <SearchIcon />
                </button>
              </Link>
            )
          }
        </form>
      </div>
    </main>
  );
}
