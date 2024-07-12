import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMemberWithProfile = Server & {
  members: (Member & { profile: Profile })[];
};
