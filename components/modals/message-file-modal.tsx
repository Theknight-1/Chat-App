"use client";
import React from "react";
import * as z from "zod";
import qs from "query-string";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required.",
  }),
});

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { apiUrl, query } = data;

  const inModalOpen = isOpen && type === "messageFile";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitted;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });
      form.reset();
      router.refresh();
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={inModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white p-0 text-black overflow-hidden">
        <DialogHeader className="pt-5 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600">
            Send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
            <DialogFooter className="bg-gray-100 pb-3 flex justify-center">
              <Button
                variant="primary"
                type="submit"
                className=" w-[60%] px-6 py-3 bg-zinc-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
