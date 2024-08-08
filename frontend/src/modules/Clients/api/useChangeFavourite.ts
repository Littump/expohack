import { useMutation } from "@tanstack/react-query";
import clientsService from "./clientsService.ts";
import { queryClient } from "@/main.tsx";

export const useChangeFavourite = () =>
  useMutation({
    mutationFn: (id: string) => clientsService.changeFavourite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients", true] });
    },
  });
