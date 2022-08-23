import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Dispatch } from "react";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any) => {
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  );

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  await axios.post(`${BASE_URL}/api/auth`, user);

  return user;
};
