'use client'

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { BiSolidHide } from 'react-icons/bi';
import {
  FaEye,
  FaStar,
} from 'react-icons/fa';
import {
  MdExpandLess,
  MdExpandMore,
} from 'react-icons/md';

import { CircularProgress } from '@mui/material';

import AppExplanation from '../components/helper';
import TopNav from '../components/topNav';
import Routes from '../lib/champion/utils/routes';

export default function Summary() {
    const [bestPlayerDatas, setBestPlayerDatas] = useState([] as {
        items: number[],
        spells: number[],
        primary_page_id: number,
        secondary_page_id: number,
        primary_rune_id: number
    }[][]);
    const [itemsSetupMap, setItemsSetupMap] = useState(new Map<number, number>());
    const [builds, setBuilds] = useState([] as number[][]);
    const [perks, setPerks] = useState([] as number[][]);
    const [queryChampion, setQueryChampion] = useState('');
    const [buildItemsDisplayCount, setBuildItemsDisplayCount] = useState(6);
    const [possiblePerks, setPossiblePerksDisplayed] = useState(new Set<number>());
    const [perksDisplayed, setPerksDisplayed] = useState(new Set<number>());
    const [buildOrder, setBuildOrder] = useState([] as number[]);
    const [showBuilds, setShowBuilds] = useState(false);

    useEffect(() => {
        let buildOrder = [] as number[];

        const allArr = [] as {
            id: number | string,
            count: number
        }[]

        for (const key of Array.from(itemsSetupMap.keys())) {
            allArr.push({
                id: key,
                count: itemsSetupMap.get(Number(key))!
            })
        }

        allArr.sort((a, b) => b.count - a.count);

        for (const item of allArr) {
            if (!buildOrder.includes(item.id as number)) {
                buildOrder.push(item.id as number);
            }
        }

        setBuildOrder(buildOrder);
    }, [itemsSetupMap])

    useEffect(() => {
        if (!bestPlayerDatas.length) return;

        const itemsSetupMap = new Map<number, number>();

        for (const bestPlayerData of bestPlayerDatas) {
            bestPlayerData.forEach(
                (e: any) => {
                    if (!perksDisplayed.has(e.primary_rune_id)) return;

                    for (const item of e.items) {
                        if (item == 0) continue

                        if (!itemsSetupMap.has(item)) {
                            itemsSetupMap.set(item, 1)
                        } else {
                            itemsSetupMap.set(item, itemsSetupMap.get(item)! + 1)
                        }
                    }
                }
            )
        }

        setItemsSetupMap(itemsSetupMap);
    }, [perksDisplayed])

    useEffect(() => {
        if (bestPlayerDatas.length > 0) return;

        const championSearch = new URLSearchParams(window.location.search).get('champion');

        if (!championSearch) {
            window.location.href = '/';
        }

        setQueryChampion(championSearch!);

        axios.get(`/api/champion?champion=${championSearch}`)
            .then(({ data }) => {
                setBestPlayerDatas(data);

                const builds = [] as number[][];

                for (const bestPlayerData of data) {
                    bestPlayerData.forEach(
                        (e: any) => {
                            builds.push(e.items.filter((e: number) => e != 0));
                            perks.push([e.primary_page_id, e.secondary_page_id, e.primary_rune_id]);
                            possiblePerks.add(e.primary_rune_id);

                            for (const item of e.items) {
                                if (item == 0) continue

                                if (!itemsSetupMap.has(item)) {
                                    itemsSetupMap.set(item, 1)
                                } else {
                                    itemsSetupMap.set(item, itemsSetupMap.get(item)! + 1)
                                }
                            }
                        }
                    )
                }

                setBuilds(builds)
            })

        return () => {
            setBestPlayerDatas([]);
            setBuilds([]);
            setPerks([]);
            setItemsSetupMap(new Map<number, number>());
            setBuildOrder([]);
            setPerksDisplayed(new Set<number>());
            setPossiblePerksDisplayed(new Set<number>());
        }
    }, [])

    return (
        <div>
            <TopNav />
            <AppExplanation />
            <div className='flex justify-center gap-2 flex-col align-middle font-mono h-screen'>
                {
                    !bestPlayerDatas.length && (
                        <div className='flex items-center justify-center gap-5 w-full h-full'>
                            <div className='flex flex-col items-center gap-5'>
                                <h1 className='text-6xl'>
                                    Loading {queryChampion} builds
                                </h1>
                                <CircularProgress color="secondary" />
                            </div>
                        </div>
                    )
                }
                {
                    bestPlayerDatas.length > 0 && (
                        <div className='h-full flex flex-col gap-5 items-center pt-5'>
                            <div className='flex items-center flex-col gap-2 p-3 border rounded-md bg-gray-900 border-gray-800'>
                                <div className='flex gap-2 items-center'>
                                    {
                                        Array.from(possiblePerks)
                                            .map(e => {
                                                return (
                                                    <button
                                                        className={
                                                            `flex flex-col gap-2 text-center 
                                                        ${perksDisplayed.has(e) ? 'border-yellow-300' : 'grayscale border-gray-700'} 
                                                        p-2 border rounded-md`
                                                        }
                                                        onClick={
                                                            () => {
                                                                if (perksDisplayed.has(e)) {
                                                                    perksDisplayed.delete(e);
                                                                } else {
                                                                    perksDisplayed.add(e);
                                                                }

                                                                setPerksDisplayed(new Set(perksDisplayed));
                                                            }
                                                        }
                                                    >
                                                        <img
                                                            src={`${Routes.runeRoute(e)}`}
                                                            alt={`item-${e}`}
                                                            className='w-16'
                                                        />
                                                    </button>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                            {
                                perksDisplayed.size == 0 && (
                                    <div className='flex items-center flex-col gap-2 p-3 border rounded-md bg-gray-900 border-gray-800'>
                                        <p>You need to select at least one rune page of your preference to see the best builds</p>
                                    </div>
                                )
                            }
                            {
                                perksDisplayed.size > 0 && (
                                    <div className='
                                flex items-center flex-col gap-4 p-5 
                                border rounded-md bg-gray-900 border-yellow-400
                                '>
                                        <div className='flex gap-2 items-center justify-center align-middle pb-3'>
                                            <div className='text-yellow-400'>
                                                <FaStar />
                                            </div>
                                            Most common build items
                                        </div>
                                        <div className='grid grid-cols-6 gap-2'>
                                            {
                                                buildOrder
                                                    .slice(0, buildItemsDisplayCount)
                                                    .map(e => {
                                                        return (
                                                            <div className='flex flex-col gap-2 text-center'>
                                                                <img src={`${Routes.itemRoute(e)}`} alt={`item-${e}`} />
                                                            </div>
                                                        )
                                                    })
                                            }
                                        </div>
                                        <div className='flex gap-5 justify-center'>
                                            <button
                                                className='p-2 font-black text-lg border rounded-md'
                                                onClick={
                                                    () => {
                                                        setBuildItemsDisplayCount(buildItemsDisplayCount + 6);
                                                    }
                                                }>
                                                <MdExpandMore />
                                            </button>
                                            {
                                                buildItemsDisplayCount > 6 && (
                                                    <button
                                                        className='p-2 font-black text-lg border rounded-md'
                                                        onClick={
                                                            () => {
                                                                setBuildItemsDisplayCount(buildItemsDisplayCount - 6);
                                                            }
                                                        }
                                                    >
                                                        <MdExpandLess />
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                !showBuilds && perksDisplayed.size > 0 && (
                                    <button
                                        className='
                                        p-3 rounded-md border 
                                        border-gray-700 bg-gray-900 
                                        flex gap-3
                                        align-middle
                                        items-center
                                        justify-center
                                        '
                                        onClick={
                                            () => {
                                                setShowBuilds(true);
                                            }
                                        }
                                    >
                                        <BiSolidHide />
                                        Show build samples
                                    </button>
                                )
                            }
                            {
                                showBuilds && perksDisplayed.size > 0 && (
                                    <button
                                        className='
                                        p-3 rounded-md border 
                                        border-gray-700 bg-gray-900 
                                        flex gap-3
                                        align-middle
                                        items-center
                                        justify-center
                                        '
                                        onClick={
                                            () => {
                                                setShowBuilds(false);
                                            }
                                        }
                                    >
                                        <FaEye />
                                        Hide build samples
                                    </button>
                                )
                            }
                            {
                                perksDisplayed.size > 0 && showBuilds && (
                                    <div className='flex flex-col gap-5 items-center justify-center p-3 border rounded-md bg-gray-900 border-gray-800'>
                                        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-2 items-start align-middle'>
                                            {
                                                builds.map((e, i) => {
                                                    if (!perksDisplayed.has(perks[i][2])) return null;
                                                    return (
                                                        <div className='flex gap-2 border p-5 rounded-md border-gray-700'>
                                                            <div className='flex pr-3'>
                                                                <div className='flex items-center'>
                                                                    {
                                                                        <img src={`${Routes.runeRoute(perks[i][2])}`} alt={`perk-${perks[i][2]}`} className='w-14' />
                                                                    }
                                                                </div>
                                                                <div className='flex w-6 items-center flex-col gap-5 justify-center'>
                                                                    {
                                                                        <img src={`${Routes.perkRoute(perks[i][0])}`} alt={`perk-${perks[i][0]}`} />
                                                                    }
                                                                    {
                                                                        <img src={`${Routes.perkRoute(perks[i][1])}`} alt={`perk-${perks[i][1]}`} />
                                                                    }
                                                                </div>
                                                            </div>
                                                            {
                                                                e.map((e: any, i) => {
                                                                    return (
                                                                        <img src={`${Routes.itemRoute(e)}`} alt={`item-${e}`} />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}