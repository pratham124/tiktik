import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import Head from "next/head";

interface IProps {
  data: {
    user: IUser;
    userVids: Video[];
    userLikes: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVids, userLikes } = data;
  const [showUserVideos, setshowUserVideos] = useState(true);
  const [videosList, setvideosList] = useState<Video[]>([]);
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setvideosList(userVids);
    } else {
      setvideosList(userLikes);
    }
  }, [showUserVideos, userVids, userLikes]);

  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta
          name="Profile"
          content="Profile Page of the user where you can check what they have liked or posted"
        />
        <link rel="icon" href="/video-player.png" />
      </Head>
      <div className="w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              src={user.image}
              width={120}
              height={120}
              className="rounded-full"
              alt="user profile"
              layout="responsive"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="flex gap-1  text-md font-bold text-primary lowercase md:text-2xl tracking-wider items-center justify-center">
              {user.userName.replace(" ", "")}{" "}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="capitalize text-gray-400 text-xs md:text-xl">
              {user.userName}
            </p>
          </div>
        </div>

        <div>
          <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
              onClick={() => setshowUserVideos(true)}
            >
              Videos
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
              onClick={() => setshowUserVideos(false)}
            >
              Likes
            </p>
          </div>

          <div className="flex gap-6 flex-wrap md:justify-start">
            {videosList.length > 0 ? (
              videosList.map((post: Video, i: number) => (
                <VideoCard post={post} key={i} />
              ))
            ) : (
              <NoResults
                text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};
