import { useQuery } from "@tanstack/react-query";
import clientsService from "./clientsService";

export const useGetHistory = (id: string) =>
  useQuery({
    queryKey: ["history" + id],
    queryFn: () => clientsService.getHistory(id),
    placeholderData: (prev) => prev,
  });
