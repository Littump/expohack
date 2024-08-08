import { Spin } from "@/ui/Spin";
import { useGetClients } from "../api";
import { ClientItem } from "./ClientItem";
import { Box } from "@/ui/Box";
import { ChangeEventHandler, useCallback, useState } from "react";
import { TextInput } from "@/ui/TextInput";
import { useDebounce } from "@/helpers/useDebounce";
import { useChangeFavourite } from "../api";
import styles from "./styles.module.css";

export const Clients = ({
  showOnlyFavourites = false,
}: {
  showOnlyFavourites?: boolean;
}) => {
  const [search, setSearch] = useState("");
  const searchParam = useDebounce(search);
  const { data, isPending } = useGetClients(searchParam, showOnlyFavourites);
  const { mutate } = useChangeFavourite();

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value;
      setSearch(value);
    },
    [setSearch]
  );

  if (!data || isPending) return;
  const clients = showOnlyFavourites
    ? data.data.map((el) => ({ id: el.client, isFavorite: true }))
    : data.data.map((el) => ({ id: el.id, isFavorite: el.is_favorite }));

  return (
    <div className="flex flex-col gap-[38px]">
      <TextInput
        value={search}
        placeholder="Искать клиента"
        onChange={handleChange}
        className={styles.searchInput}
        endContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        }
      />
      <Box>
        <div className="w-full flex justify-between pt-[19px] pb-[9px] px-[25px] text-gray-300">
          <span>ID</span>
          <span>ИЗБРАННОЕ</span>
        </div>
        {!data || isPending ? (
          <Spin />
        ) : (
          clients.map((client) => (
            <ClientItem mutate={mutate} {...client} key={client.id} />
          ))
        )}
      </Box>
    </div>
  );
};
