"use client";

import { SeasonProps } from "@/components/main/season";
import { NAMES } from "@/constants";
import { useMatch } from "@/hooks/use-match";
import { useSeason } from "@/hooks/use-season";
import { useEffect, useState } from "react";
import { Match, MatchProps } from "./match";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SeasonDetailProps {
  id: number;
}

export const SeasonDetail = (props: SeasonDetailProps) => {
  const { getSeason } = useSeason();
  const { getMatches } = useMatch();
  const [season, setSeason] = useState<SeasonProps>();
  const [matches, setMatches] = useState<MatchProps[]>();
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    const fetchSeason = async () => {
      const res = await getSeason(Number(props.id));
      if (res) {
        setSeason(res);
        setIsEnd(Math.max(res.point1, res.point2) >= res.win);
        const res2 = await getMatches(res.id || 0);
        if (res2) {
          setMatches(res2);
        }
      }
    };

    fetchSeason();
  }, []);

  return (
    <div className="pt-10 px-6 flex flex-col">
      <span className="font-bold text-2xl">{season?.name}</span>
      <span className="text-green-700 font-bold">Chạm {season?.win}</span>
      <div className="mt-10">
        <span className="font-bold text-lg mt-4">Tỉ số hiện tại:</span>
        <span className="ml-4">
          <span
            className={`${isEnd && (season?.point1 || 0) > (season?.point2 || 0) && "text-yellow-500 font-bold"}`}
          >
            {NAMES.p1}{" "}
            <span className="p-2 bg-gray-100 ml-2">{season?.point1}</span>
          </span>
          <span className="mx-4">-</span>
          <span
            className={`${isEnd && (season?.point1 || 0) < (season?.point2 || 0) && "text-yellow-500 font-bold"}`}
          >
            <span className="p-2 mr-2 bg-gray-100">{season?.point2}</span>{" "}
            {NAMES.p2}
          </span>
        </span>
      </div>
      <div className="flex flex-col mt-10">
        <span className="text-lg font-bold">Các trận đấu đã diễn ra</span>
        {matches?.map((match) => (
          <Match
            id={match.id}
            key={match.id}
            point1={match.point1}
            point2={match.point2}
          />
        ))}
      </div>
      {!isEnd && (
        <Link href={`/season/${props.id}/new`}>
          <Button className="mt-6 w-[150px]" variant="create">
            Thêm trận mới
          </Button>
        </Link>
      )}
    </div>
  );
};
