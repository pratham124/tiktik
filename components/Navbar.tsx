import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";

import { IUser } from "../types";
import { userAdd, userRemove } from "../app/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store/store";

const Navbar = () => {
  const [user, setuser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    setuser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 sm:py-2 px-4 pt-2 pb-16">
      <Link href={"/"}>
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="Logo"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative ">
        <form
          onSubmit={handleSearch}
          className="absolute md:static md:top-10 -left-20 bg-white top-[-25px]"
        >
          <input
            type={"text"}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search accounts and videos"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300  md:w-[350px] rounded-full  sm:w-[222px]  sm:static absolute top-14"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-gray-300 border-l-2 pl-4 text-2xl text-gray-400 md:block hidden"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {user && (
          <div className="flex gap-5 md:gap-10 ">
            <Link href={"/upload"}>
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="profile photo"
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className="px-2 cursor-pointer"
              onClick={() => {
                googleLogout();

                dispatch(userRemove());
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        )}
        {!user && (
          <GoogleLogin
            onSuccess={(response) => {
              const userCreated = async () => {
                try {
                  const user = await createOrGetUser(response);
                  dispatch(userAdd(user));
                } catch (err) {
                  console.log(err);
                }
              };
              userCreated();
            }}
            onError={() => console.log("error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
