import { useQuery } from "@tanstack/react-query";
import clientsService from "./clientsService";

export const useGetClients = (filter: string, showOnlyFavourites: boolean) =>
  useQuery({
    queryKey: ["clients" + filter, showOnlyFavourites],
    queryFn: () => clientsService.getClients(filter, showOnlyFavourites),
    placeholderData: (prev) => prev,
  });
