import { useQuery } from "@tanstack/react-query";
import thingsService from "./thingsService";

export const useGetThings = (filter: string) =>
  useQuery({
    queryKey: ["things" + filter],
    queryFn: () => {
      if (/^\d+$/.test(filter)) return thingsService.getThings({ id: filter });
      else return thingsService.getThings({ name: filter });
    },
    placeholderData: (prev) => prev,
  });
