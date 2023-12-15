import React from "react";
import withAuth from "@/lib/withAuth";
import { removeCookie } from "@/lib/cookie";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  const out = () => {
    removeCookie("key");
    router.push("/auth/login");
  };

  return (
    <div>
      <p>profil</p>
      <button onClick={out}>Log out</button>
    </div>
  );
};
export default withAuth(Profile);
