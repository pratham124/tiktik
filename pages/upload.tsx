import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store/store";
import Head from "next/head";

const FILETYPES = ["video/mp4", "video/webm", "video/ogg"];

const Upload = () => {
  const [isLoading, setisLoading] = useState(false);
  const [videoAsset, setvideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setwrongFileType] = useState(false);
  const [caption, setcaption] = useState("");
  const [category, setcategory] = useState(topics[0].name);
  const [savingPost, setsavingPost] = useState(false);
  const userProfile = useSelector((state: RootState) => {
    return state.user.userProfile;
  });
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];

    if (FILETYPES.includes(selectedFile.type)) {
      setisLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setvideoAsset(data);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
      setwrongFileType(true);
    }
  };

  const handleDiscard = () => {
    setsavingPost(false);
    setvideoAsset(undefined);
    setcaption("");
  };

  const postHandler = async (e: any) => {
    if (caption && videoAsset?._id && category) {
      setsavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Upload Videos</title>
        <meta
          name="Upload"
          content="Upload Page where users are able to upload videos for others to view"
        />
        <link rel="icon" href="/video-player.png" />
      </Head>
      <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
        <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap  items-center p-14 pt-6  justify-center">
          <div>
            <div>
              <p className="text-2xl font-bold">Upload Video</p>
              <p className="text-md text-gray-400 mt-1">
                Post a video to your account
              </p>
            </div>
            <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
              {isLoading && (
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#F51997"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              )}
              {!isLoading && (
                <div>
                  {videoAsset && (
                    <div className="rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center ">
                      <video
                        className="rounded-xl h-[462px] mt-16 bg-black"
                        loop
                        controls
                        src={videoAsset.url}
                      ></video>
                      <div className=" flex justify-between gap-20">
                        <p className="text-lg">{videoAsset.originalFilename}</p>
                      </div>
                    </div>
                  )}
                  {!videoAsset && (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p className="text-xl font-semibold">Upload Video</p>
                        </div>
                        <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                          MP4 or WebM or ogg <br />
                          720x1280 or higher <br />
                          Up to 10 minutes <br />
                          Less than 2GB
                        </p>
                        <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none cursor-pointer">
                          Select File
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        className="w-0 h-0"
                        onChange={uploadVideo}
                      />
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                  Please select a valid video file
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <label className="text-md font-medium pt-10 md:pt-0">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setcaption(e.target.value)}
              className="rounded outline-none text-md border-2 border-gray-200 p-2"
            />
            <label className="text-md font-medium">Choose a category</label>
            <select
              onChange={(e) => {
                setcategory(e.target.value);
              }}
              className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
            >
              {topics.map((topic) => (
                <option
                  key={topic.name}
                  className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                  value={topic.name}
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10">
              <button
                onClick={postHandler}
                type="button"
                className="bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Post
              </button>
              <button
                onClick={handleDiscard}
                type="button"
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
