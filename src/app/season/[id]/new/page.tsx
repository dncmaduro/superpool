"use client";

import { NewMatch } from "@/components/season/detail/new-match";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  return (
    <div className="pt-10 px-6 flex flex-col">
      <NewMatch season_id={Number(id)} />
    </div>
  );
};

export default Page;
