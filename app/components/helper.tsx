'use client';

export default function AppExplanation() {
    return (
        <div className="
        w-full flex flex-col gap-2 justify-center 
        align-middle items-center p-5 
        border-b border-gray-700
        "
        >
            <h1 className='text-4xl flex gap-2'>
                The <p className="text-yellow-300">BEST</p> build?
            </h1>
            <p className='text-base flex gap-4 w-[60%] text-center text-gray-400 italic'>
                For hextech
                the best built is one that is built and tested by the highest ranked players that plays with the specified champion you are looking for.
            </p>
        </div>
    );
}
