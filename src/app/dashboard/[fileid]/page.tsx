"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
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
    <div>
      <Navbar />
      <MaxWidthWrapper>
        <h1>hi</h1>
        {fileid}
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
