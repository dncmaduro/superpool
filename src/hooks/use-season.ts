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

  const getSeason = async (id: number) => {
    const { data } = await supabase.from("season").select("*").eq("id", id);
    if (data) {
      toast({
        title: "Xem giải đê",
      });
      return data[0];
    }

    toast({
      title: "Giời ơi load lại đi không lấy được thông tin!",
      variant: "destructive",
    });
    return null;
  };

  const newMatch = async (id: number, win: boolean) => {
    const { data } = await supabase.from("season").select("*").eq("id", id);
    if (data) {
      const season = data[0];
      if (win) {
        const { data: data2 } = await supabase
          .from("season")
          .update({ point1: season.point1 + 1 })
          .eq("id", id)
          .select();

        if (data2) {
          toast({
            title: "Oke giờ thì đã hoàn thành xong trận",
          });

          return data2;
        }

        toast({
          title: "Nó bị failed, check lại data nhé",
          variant: "destructive",
        });
        return null;
      }

      const { data: data2 } = await supabase
        .from("season")
        .update({ point2: season.point2 + 1 })
        .eq("id", id)
        .select();

      if (data2) {
        toast({
          title: "Oke giờ thì đã hoàn thành xong trận",
        });

        return data2;
      }

      toast({
        title: "Nó bị failed, check lại data nhé",
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Giời ơi load lại đi không lấy được thông tin!",
      variant: "destructive",
    });
    return null;
  };

  return { createSeason, getSeasons, getSeason, newMatch };
};
