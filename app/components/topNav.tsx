'use client';

import {
  useEffect,
  useState,
} from 'react';

import SearchIcon from '@mui/icons-material/Search';

export default function TopNav() {
    const [accountName, setAccountName] = useState("");
    const [examplePlaceHolder, setExamplePlaceHolder] = useState("Search for garen");
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
            <div className='flex gap-10 text-center'>
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
                            <button
                                className='bg-black text-white rounded-lg p-2'
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
    );
}
