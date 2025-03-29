import Image from "next/image";
import Link from "next/link";

interface CardProps {
    id: string
    name: string;
    description?: string;
    imageUrl: string;
    buttonText?: string;
}

const DiscoverCard: React.FC<CardProps> = ({ id, name, description, imageUrl, buttonText = "Learn More" }) => {
    return (
        <Link href={`/server/${id}`}>
            <div className="dark:bg-[#232428] shadow-lg rounded-2xl cursor-pointer w-full md:max-w-xs transition-transform transform">
                <div className="relative w-full h-40">
                    <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" className="rounded-t-lg" loading="lazy" />
                    <div className="absolute left-5 -bottom-5 p-1 dark:bg-[#232428] rounded-lg">
                        <Image src={imageUrl} alt={name} height={100} width={100} objectFit="cover" className="w-12 h-12 rounded-lg" loading="lazy" />
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="text-base text-primary my-2 font-semibold">{name}</h3>
                    {/* <p className="dark:text-gray-300 leading-3 text-xs mt-2">{description}</p> */}
                </div>
            </div>
        </Link>
    );
};

export default DiscoverCard;
