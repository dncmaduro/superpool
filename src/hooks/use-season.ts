import { createClient } from "@supabase/supabase-js";
import { useToast } from "./use-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
);

export const useSeason = () => {
  const { toast } = useToast();

  const createSeason = async (name: string) => {
    const { data, error } = await supabase
      .from("season")
      .insert([{ name }])
      .select();
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

  return { createSeason };
};
