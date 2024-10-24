import { createClient } from "@supabase/supabase-js";
import { useToast } from "./use-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
);

export const useMatch = () => {
  const { toast } = useToast();

  const getMatches = async (season_id: number) => {
    const { data } = await supabase
      .from("match")
      .select("*")
      .eq("season_id", season_id);
    if (data) {
      toast({
        title: "Xem các trận đê",
      });
      return data;
    }

    toast({
      title: "Không hiểu sao không thấy trận nào",
      variant: "destructive",
    });
    return null;
  };

  return { getMatches };
};
