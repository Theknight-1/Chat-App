"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { LayoutGrid, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface HeaderContent {
    title: string;
    subtitle: string;
    bgGradient?: string;
}

const HEADER_CONTENT: Record<string, HeaderContent> = {
    "/discovery/apps": {
        title: "FIND THINGS TO DO TOGETHER",
        subtitle: "Bring the fun to your hangouts with apps for games, music, creative tools, and more.",
        bgGradient: "bg-white dark:bg-gradient-to-br from-[#22498b] via-[#13124f] to-[#0a0927]",
    },
    "/discovery/servers": {
        title: "FIND YOUR COMMUNITY ON DISCORD",
        subtitle: "From gaming, to music, to learning, there's a place for you.",
        bgGradient: "bg-white dark:bg-gradient-to-br from-[#22498b] via-[#13124f] to-[#0a0927]",
    },
    "/discovery/quests": {
        title: "PLAY, WATCH, EARN REWARDS",
        subtitle: "Win in-game items, Discord avatar decorations, and more through Quests.",
        bgGradient: "bg-white dark:bg-gradient-to-br from-[#0c1522] via-[#0c1522] to-[#0c1522]",
    },
};

const DiscoverHeader = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);

    // Redirect from "/" to "/discovery/apps" on initial load
    useEffect(() => {
        if (pathname === "/") {
            router.replace("/discovery/apps");
        }
    }, [pathname, router]);

    // Handle scroll event for changing background color
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Find the active section based on the current pathname
    const activeSection =
        Object.keys(HEADER_CONTENT).find((path) => pathname?.startsWith(path)) ||
        "/discovery/apps";

    const { title, subtitle, bgGradient } = HEADER_CONTENT[activeSection];

    return (
        <div
            key={pathname}
            className={`w-full h-[300px] lg:h-[348px] relative  ${bgGradient || "bg-gradient-to-br from-[#22498b] via-[#13124f] to-[#0a0927]"}`}
        >
            {/* Navigation Bar */}
            <div
                className={`flex justify-between items-center pl-6 lg:pr-3 py-3 fixed top-0 w-full md:w-[calc(100%-300px)] z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-[#2b2d31] border-b border-gray-700" : "bg-transparent"
                    }`}
            >
                <div className="flex items-center space-x-6 text-sm">
                    <LayoutGrid className="h-5 w-5" />
                    {[
                        "Featured",
                        "Games",
                        "Entertainment",
                        "Moderation and Tools",
                        "Social",
                        "Utilities",
                    ].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="dark:text-gray-300 hover:text-blue-400 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-800 text-white placeholder-gray-400 hidden lg:block lg:max-w-64 rounded-md px-4 py-2 focus:outline-none"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
            </div>
            <Separator />

            {/* Header Content */}
            <div className="px-16 lg:px-24 xl:px-48 py-24">
                <h1 className="font-extrabold text-3xl xl:text-5xl uppercase text-black dark:text-white w-full lg:w-[80%] xl:w-[49%]">
                    {title}
                </h1>
                <p className="text-primary/40 mt-3 text-base">{subtitle}</p>
            </div>
        </div>
    );
};

export default DiscoverHeader;
