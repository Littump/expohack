import { useQuery } from "@tanstack/react-query";
import thingService from "./thingService";

export const useGetRecommendation = (id: string) =>
  useQuery({
    queryKey: ["thingRecommendation", id],
    queryFn: () => thingService.getRecommendation(id),
    placeholderData: (prev) => prev,
  });
