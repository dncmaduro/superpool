import { NAMES } from "@/constants";

export interface SeasonProps {
  id: number;
  name: string;
  point1: number;
  point2: number;
  win: number;
}
export const Season = (props: SeasonProps) => {
  return (
    <div className="w-[300px] hover:bg-green-100 cursor-pointer mx-auto h-[200px] shadow border border-gray-300 px-6 py-4 flex flex-col justify-between rounded-lg">
      <div>
        <span className="font-bold text-lg">{props.name}</span>
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex justify-between items-center">
            <span>{NAMES.p1}</span>
            <span className="font-bold">{props.point1}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>{NAMES.p2}</span>
            <span className="font-bold">{props.point2}</span>
          </div>
        </div>
      </div>
      <span>Chạm {props.win}</span>
    </div>
  );
};
