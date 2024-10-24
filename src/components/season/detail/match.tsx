"use client";

import { NAMES } from "@/constants";

export interface MatchProps {
  id: number;
  point1: number;
  point2: number;
}

export const Match = (props: MatchProps) => {
  return (
    <div className="ml-4 my-4 flex gap-2">
      <span className="mr-4">{props.id}.</span>
      <span
        className={`${props.point1 > props.point2 ? "text-green-600" : "text-red-600"} font-bold flex gap-2`}
      >
        <span>{NAMES.p1}</span>
        <span>{props.point1}</span>
      </span>
      <span>-</span>
      <span
        className={`${props.point1 < props.point2 ? "text-green-600" : "text-red-600"} font-bold flex gap-2`}
      >
        <span>{props.point2}</span>
        <span>{NAMES.p2}</span>
      </span>
    </div>
  );
};
