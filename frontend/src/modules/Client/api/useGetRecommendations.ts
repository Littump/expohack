import { useQuery } from "@tanstack/react-query";
import clientsService from "./clientsService";

export const useGetRecommendations = (id: string) =>
  useQuery({
    queryKey: ["recommendations" + id],
    queryFn: () => clientsService.getRecommendations(id),
    placeholderData: (prev) => prev,
  });
