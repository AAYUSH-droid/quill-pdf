"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";

const Navbar = () => {
  const userID = useAuth();
  const { user } = useUser();
  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            <span>quill.</span>
          </Link>
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing{" "}
              </Link>

              <div className="items-center">
                <div className="flex justify-between">
                  {userID.isSignedIn ? (
                    <div className="flex items-center justify-between">
                      <div className="flex w-12 items-center justify-center rounded-lg bg-white p-2 hover:bg-gray-300">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                      <div className="ml-4"> Hi, {user?.firstName}</div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 font-bold">
                      <Button>
                        <Link href="/auth/signin/instant">Login</Link>
                      </Button>
                      <Button>
                        <Link href="/auth/signup/instant">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
