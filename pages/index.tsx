import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length > 0 &&
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))}
      {videos.length === 0 && <NoResults text={"No Videos"} />}
    </div>
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
