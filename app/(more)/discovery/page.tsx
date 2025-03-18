import React from 'react'
import { redirect } from "next/navigation";

const page = async () => {
    return redirect(`/discovery/apps`);
}

export default page
