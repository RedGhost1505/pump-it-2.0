import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { IoMdCloudyNight } from "react-icons/io";

const menu = () => {
    return (
        <>
            <div className="flex flex-col z-0 w-full min-h-[100vh] bg-black">
                <div className="flex flex-row justify-between items-center z-10 pt-4 px-8 w-full">
                    <div className='flex flex-row items-center'>
                        <div>
                            <h1 className="text-4xl font-normal text-white">10.59</h1>
                            <h3 className="text-4xl font-extralight text-white">PM</h3>
                        </div>
                        <IoMdCloudyNight className="text-4xl text-white ml-6" />
                    </div>
                    <h1 className="text-4xl font-bold text-white">Pump-<span className="text-red-600">It</span></h1>
                    <Link href="/menu">
                        <Button
                            size="lg"
                            className="text-md font-bold bg-transparent border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-500"
                        >
                            Sign Out
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default menu


