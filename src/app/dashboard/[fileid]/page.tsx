"use client";

import ChatWrapper from "@/components/ChatWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import PdfRenderer from "@/components/PdfRenderer";
import { api } from "@/trpc/react";

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = ({ params }: PageProps) => {
  //   if (!userId)
  //     redirect(`/auth/signin?next=${encodeURIComponent("/dashboard")}`);

  const { data: user } = api.authCallback.returnUser.useQuery();
  console.log(user?.user_id); //user_2ePMa8ppJfWTspf0Zre5vfvyQ6V

  const { fileid } = params;

  const { data: file } = api.files.getFile.useQuery({
    fileId: fileid,
    userID: user?.user_id ?? "",
  });
  console.log("fileDATA:", file);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <Navbar />
      {/* <MaxWidthWrapper> */}
      <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
        {/* {fileid} */}
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <PdfRenderer />
            {/* <PdfRenderer url={file.url} /> */}
          </div>
        </div>

        <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
          {/* <ChatWrapper isSubscribed={plan.isSubscribed} fileId={file.id} /> */}
        </div>
      </div>
      {/* </MaxWidthWrapper> */}
    </div>
  );
};

export default Page;
