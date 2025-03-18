import DiscoverCard from '@/components/discover-more/discover-card';
import DiscoverHeader from '@/components/discover-more/discover-header'
import React from 'react'


const data = [
    {
        title: "Next.js Dynamic Card",
        description: "This card is dynamically generated in Next.js using Tailwind CSS.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1187013846746005515/1333543065717313626.png?size=600",
        buttonText: "Explore",
    },
    {
        title: "Another Card",
        description: "This is another example of a reusable card component.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1227546263558422601/1308016701958524948.png?size=600",
        buttonText: "Read More",
    },
    {
        title: "Next.js Dynamic Card",
        description: "This card is dynamically generated in Next.js using Tailwind CSS.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1187013846746005515/1333543065717313626.png?size=600",
        buttonText: "Explore",
    },
    {
        title: "Another Card",
        description: "This is another example of a reusable card component.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1227546263558422601/1308016701958524948.png?size=600",
        buttonText: "Read More",
    },
    {
        title: "Next.js Dynamic Card",
        description: "This card is dynamically generated in Next.js using Tailwind CSS.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1187013846746005515/1333543065717313626.png?size=600",
        buttonText: "Explore",
    },
    {
        title: "Another Card",
        description: "This is another example of a reusable card component.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1227546263558422601/1308016701958524948.png?size=600",
        buttonText: "Read More",
    },
    {
        title: "Next.js Dynamic Card",
        description: "This card is dynamically generated in Next.js using Tailwind CSS.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1187013846746005515/1333543065717313626.png?size=600",
        buttonText: "Explore",
    },
    {
        title: "Another Card",
        description: "This is another example of a reusable card component.",
        imageUrl: "https://cdn.discordapp.com/app-assets/1227546263558422601/1308016701958524948.png?size=600",
        buttonText: "Read More",
    },
];


const More = () => {
    return (
        <div className=''>
            <DiscoverHeader />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-[90%] xl:w-[76%] mx-auto py-8'>
                {data.map((item, index) => (
                    <DiscoverCard key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default More
