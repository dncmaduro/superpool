"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Season, SeasonProps } from "./season";
import { useEffect, useState } from "react";
import { useSeason } from "@/hooks/use-season";

export const Main = () => {
  const [seasons, setSeasons] = useState<SeasonProps[]>();
  const { getSeasons } = useSeason();

  useEffect(() => {
    const fetch = async () => {
      const res = await getSeasons();
      if (res) {
        setSeasons(res);
      }
    };

    fetch();
  }, []);

  return (
    <div className="max-w-full w-[1200px]">
      <h1 className="text-3xl font-bold text-center">
        Chơi thôi em bé oiiiiiiiiiiii
      </h1>
      <Link href="/season/new">
        <Button variant="create" className="mt-8">
          Tạo giải đấu mới
        </Button>
      </Link>
      <div className="mt-10 w-full grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {seasons?.map((season) => (
          <Season
            id={season.id}
            key={season.id}
            name={season.name}
            point1={season.point1}
            point2={season.point2}
            win={season.win}
          />
        ))}
      </div>
    </div>
  );
};
