"use client";

import { SeasonDetail } from "@/components/season/detail";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  return (
    <div className="pt-10 px-6 flex flex-col">
      <SeasonDetail id={Number(id)} />
    </div>
  );
};

export default Page;
