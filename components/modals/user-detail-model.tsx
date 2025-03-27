"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import UserAvatar from "../user-avatar";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const UserDetailsModel = () => {
    const { isOpen, onClose, type, data } = useModal();

    const inModalOpen = isOpen && type === "userDetails";
    const profile = data.profile;

    const handleClose = () => {
        onClose();
    };

    if (!inModalOpen || !profile) return null;

    return (
        <AnimatePresence>
            {inModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-[#111214]/10 z-50"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-[#2f3136] text-white overflow-hidden "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Dialog open={inModalOpen} onOpenChange={handleClose}>
                            <DialogContent className="p-0 border-none rounded-lg w-[600px] max-w-[90vw]  overflow-hidden">
                                <DialogHeader className="h-[200px] relative" style={{ backgroundColor: "rgb(236, 68, 68)" }}>
                                    <div className="absolute -bottom-14 left-6 p-2 bg-black rounded-full">
                                        <UserAvatar
                                            show={true}
                                            greenDotClassName="w-6 h-6"
                                            src={profile.imageUrl}
                                            className="md:h-28 md:w-28"
                                        />
                                    </div>
                                    <div className="absolute top-1.5 p-[2px] bg-black/60 rounded-full right-3 z-10">
                                        <MoreHorizontal className="w-6 h-6 text-white cursor-pointer" />
                                    </div>
                                </DialogHeader>
                                <div className="w-full flex items-end justify-end pr-10">
                                    <Button
                                        variant="outline"
                                        size={"sm"}
                                        className="bg-[#4f545c] text-white border-none hover:bg-[#5a5e66] w-max border border-white"
                                    // onClick={() => onOpen("editProfile", { profile })}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </div>
                                <div className=" p-4 bg-[#2e2e34]">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold">{profile.name}</h2>
                                    </div>
                                    <p className="text-xs text-gray-200 ">{profile.email}</p>

                                    <Tabs defaultValue="aboutme" className="mt-4">
                                        <TabsList className="flex items-center gap-4 w-max bg-transparent px-0">
                                            <TabsTrigger value="aboutme">
                                                About Me
                                            </TabsTrigger>
                                            <TabsTrigger value="activity">
                                                Activity
                                            </TabsTrigger>
                                        </TabsList>
                                        <div className="h-px bg-gray-200" />
                                        <TabsContent value="aboutme" className="flex items-center gap-2 ">
                                            <h3 className="text-xs font-semibold uppercase text-gray-200">Member Since</h3>
                                            <p className="text-xs text-gray-200">Jul 28, 2023</p>
                                        </TabsContent>
                                        <TabsContent value="activity" className="flex items-center gap-2 ">
                                            <h3 className="text-xs font-semibold uppercase text-gray-200">Soon you will see your activity here</h3>
                                        </TabsContent>
                                    </Tabs>
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold uppercase text-gray-200">Note</h3>
                                        <textarea rows={8} className="w-full placeholder:text-sm focus:hidden bg-[#2e2e34] border-none focus:border-2" placeholder="Click to add a note.">

                                        </textarea>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UserDetailsModel;