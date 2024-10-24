import { createClient } from "@supabase/supabase-js";
import { useToast } from "./use-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
);

export const useSeason = () => {
  const { toast } = useToast();

  const createSeason = async (name: string) => {
    const { data } = await supabase.from("season").insert([{ name }]).select();
    if (data) {
      toast({
        title: "Tạo giải đấu thành công",
      });
    } else {
      toast({
        title: "Có lỗi khi tạo giải đấu",
        variant: "destructive",
      });
    }
  };

  const getSeasons = async () => {
    const { data } = await supabase.from("season").select("*");
    if (data) {
      toast({
        title: "Đấy xem giải đấu đi!",
      });
      return data;
    }

    toast({
      title: "Giời ơi load lại đi không lấy được thông tin rồi!",
      variant: "destructive",
    });
    return null;
  };

  return { createSeason, getSeasons };
};
