import Link from "next/link";
import { Button } from "../ui/button";

export const Main = () => {
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
    </div>
  );
};
