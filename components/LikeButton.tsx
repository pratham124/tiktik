import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface IProps {
  onLikeHandler: () => void;
  onDislikeHandler: () => void;
  likes: any[];
}

const LikeButton: NextPage<IProps> = ({
  onLikeHandler,
  onDislikeHandler,
  likes,
}) => {
  const [alreadyLiked, setalreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setalreadyLiked(true);
    } else {
      setalreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked && (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
            onClick={onDislikeHandler}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        {!alreadyLiked && (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={onLikeHandler}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
