import { currentProfile } from '@/lib/current-profile';
import UserBarClient from './user-bar';

const UserBar = async () => {
    const profile = await currentProfile();
    return <UserBarClient profile={profile} />;
};

export default UserBar;