"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NAMES } from "@/constants";
import { useMatch } from "@/hooks/use-match";
import { useSeason } from "@/hooks/use-season";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface NewMatchProps {
  season_id: number;
}

export const NewMatch = (props: NewMatchProps) => {
  const { createMatch } = useMatch();
  const { newMatch } = useSeason();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const schema = z.object({
    point1: z.coerce.number().min(0, "Phải có điểm"),
    point2: z.coerce.number().min(0, "Phải có điểm"),
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    await createMatch(props.season_id, values.point1, values.point2);
    await newMatch(props.season_id, values.point1 > values.point2);
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      point1: 0,
      point2: 0,
    },
  });

  const back = () => {
    router.push(`/season/${props.season_id}`);
  };

  return (
    <div className="max-w-full w-[1200px]">
      <Button variant="link" onClick={() => back()}>
        <ArrowLeft /> Quay lại
      </Button>
      <h1 className="text-3xl font-bold text-center mt-10">
        Làm thêm trận mới
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <div className="flex gap-4">
            <FormField
              name="point1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm của {NAMES.p1}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Điền điểm của ${NAMES.p1}`}
                      className="rounded-lg"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="point2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm của {NAMES.p2}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Điền điểm của ${NAMES.p2}`}
                      className="rounded-lg"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-10" disabled={isLoading}>
            Lưu trận này vào
          </Button>
        </form>
      </Form>
    </div>
  );
};
