import DiscoverCard from '@/components/discover-more/discover-card';
import DiscoverHeader from '@/components/discover-more/discover-header'
import { db } from '@/lib/db';
import React from 'react'


const getPublicServers = async () => {
    try {
        return await db.server.findMany({
            where: {
                public: true
            }
        })
    } catch (error) {
        console.log(error);

    }
}


const More = async () => {
    const data = await getPublicServers();
    return (
        <div className=''>
            <DiscoverHeader />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-[90%] xl:w-[76%] mx-auto py-8'>
                {data?.map((item, index) => (
                    <DiscoverCard key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default More
