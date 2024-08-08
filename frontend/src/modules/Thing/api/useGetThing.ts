import { useQuery } from "@tanstack/react-query";
import thingService from "./thingService";

export const useGetThing = (id: string) =>
  useQuery({
    queryKey: ["thing", id],
    queryFn: () => thingService.getThing(id),
  });
