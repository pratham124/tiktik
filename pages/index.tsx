import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";
import Head from "next/head";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="Home"
          content="Home page where users are able to view all the videos"
        />
        <link rel="icon" href="/video-player.png" />
      </Head>
      <div className="flex flex-col gap-10 videos h-full">
        {videos.length > 0 &&
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))}
        {videos.length === 0 && <NoResults text={"No Videos"} />}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topics },
}: {
  query: { topics: string };
}) => {
  let res;
  if (topics) {
    res = await axios.get(`${BASE_URL}/api/discover/${topics}`);
  } else {
    res = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: res.data,
    },
  };
};
