import { useQuery } from "@tanstack/react-query";
import thingService from "./thingService";

export const useGetScript = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: ["script", id],
    queryFn: () => thingService.getScript(id),
    enabled,
  });
