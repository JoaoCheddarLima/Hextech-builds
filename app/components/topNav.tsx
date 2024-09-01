'use client';

import {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { ImGithub } from 'react-icons/im';

export default function TopNav() {
    const [accountName, setAccountName] = useState("");
    const [examplePlaceHolder, setExamplePlaceHolder] = useState("Search for garen");

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
            setExamplePlaceHolder('Search for ' + pickRandomChampion());
        }, 1200)

        return () => {
            clearInterval(int);
        }
    })

    const handleSearch = () => {
        window.location.href = `/summary?champion=${accountName}`
    }

    return (
        <div className="w-full flex gap-2 justify-center align-middle items-center p-5 border-b border-gray-700">
            <div className='flex flex-col gap-5 md:grid md:grid-cols-3 text-center items-center align-middle w-full justify-between'>
                <div className='flex md:hidden gap-5 align-middle justify-center items-center'>
                    <Link
                        href='/'
                        className='items-center text-2xl md:hidden flex'
                    >
                        <Image
                            src='/logo.png'
                            alt='logo'
                            width={64}
                            height={64}
                            className='w-12'
                        />
                        Hextech
                    </ Link>
                    <div className='gap-2 justify-end'>
                        <a
                            href='https://github.com/Jay-Frontera'
                            target='_blank'
                        >
                            <ImGithub
                                className='text-3xl w-12'
                            />
                        </a>
                    </div>
                </div>
                <Link
                    href='/'
                    className='items-center text-2xl md:flex hidden'
                >
                    <Image
                        src='/logo.png'
                        alt='logo'
                        width={64}
                        height={64}
                        className='w-12'
                    />
                    Hextech
                </ Link>
                <form action={handleSearch} method="get">
                    <input type="text" name="account_name" id="account_name" placeholder={examplePlaceHolder} required
                        className='text-black border-2 border-black rounded-lg p-2'
                        onChange={
                            (e) => {
                                setAccountName(e.target.value);
                            }
                        }
                    />
                </form>
                <div className='gap-2 justify-end md:flex hidden'>
                    <a
                        href='https://github.com/Jay-Frontera'
                        target='_blank'
                    >
                        <ImGithub
                            className='text-3xl w-12'
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
