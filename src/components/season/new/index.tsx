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
import { useSeason } from "@/hooks/use-season";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const NewSeason = () => {
  const { createSeason } = useSeason();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const schema = z.object({
    name: z.string().min(1, "Ghi đủ tên vào!"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    await createSeason(values.name);
    setIsLoading(false);
  };

  const back = () => {
    router.push("/");
  };

  return (
    <div className="max-w-full w-[1200px]">
      <Button variant="link" onClick={() => back()}>
        <ArrowLeft /> Quay lại
      </Button>
      <h1 className="text-3xl font-bold text-center mt-10">Làm cái giải mới</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Điền cái tên giải vào đây"
                    className="rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10" disabled={isLoading}>
            Tạo giải thôi
          </Button>
        </form>
      </Form>
    </div>
  );
};
