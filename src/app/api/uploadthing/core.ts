import { db } from "@/server/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { auth, currentUser } from "@clerk/nextjs";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(async () => {
      //set auth
      // const { data: user } = api.authCallback.returnUser.useQuery();
      // console.log("logged in user: ", user);
      // if (!user) {
      //   throw new Error("User not found");
      // }
      const { userId } = auth();
      if (!userId) {
        throw new UploadThingError("Unauthorized");
      }
      const user = await currentUser();
      console.log("user: ", user?.id);

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: String(metadata.user?.id),
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
        },
      });
      console.log("metadata: ", metadata);
      console.log("file: ", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
