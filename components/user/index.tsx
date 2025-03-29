import { currentProfile } from '@/lib/current-profile';
import UserBarClient from './user-bar';

const UserBar = async () => {
    const profile = await currentProfile();
    if (!profile) {
        throw new Error("Profile not found"); // Handle the null case with an error
    }
    return <UserBarClient profile={profile} />;
};

export default UserBar;