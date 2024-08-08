import { useMutation } from "@tanstack/react-query";
import clientsService from "./clientsService.ts";

export const useChangeFavourite = () =>
  useMutation({
    mutationFn: (id: string) => clientsService.changeFavourite(id),
  });
