import { GetServerSideProps } from "next";
import Loader from "@/components/Loader";
import { Content } from "@next/font/google";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Iurl {
  url: string;
  error: boolean;
}

export default function UrlPage(props: Iurl) {
  const { url, error } = props;
  const router = useRouter();
  useEffect(() => {
    if (error) {
      router.push("/error");
    } else {
      window.location.href = url;
    }
  }, []);
  return <Loader />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sid } = context.query;
  const { data } = await axios.get(`https://h-ref.vercel.app/api/${sid}`);
  return {
    props: {
      url: data.url || "invalid shortId",
      error: data.error,
    },
  };
};
