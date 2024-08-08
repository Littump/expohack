import { useDebounce } from "@/helpers/useDebounce";
import { ThingItem, useGetThings } from "@/modules/Things";
import { Spin } from "@/ui/Spin";
import { ChangeEventHandler, useCallback, useState } from "react";
import styles from "./styles.module.css";
import { TextInput } from "@/ui/TextInput";
import { Text } from "@/ui/Text";

export const History = () => {
  const [search, setSearch] = useState("");
  const searchParam = useDebounce(search);
  const { data, isPending } = useGetThings(searchParam);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value;
      setSearch(value);
    },
    [setSearch]
  );

  return (
    <div>
      <Text variant="l" className="mb-[43px] block">
        История покупок
      </Text>
      <TextInput
        value={search}
        placeholder="Искать товар (id, название)"
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
      <div className="w-full mt-[20px] grid grid-cols-3 pt-[19px] pb-[9px] px-[25px] text-gray-300">
        <span>ID</span>
        <span>Компания</span>
        <span>Товар</span>
      </div>
      {!data || isPending ? (
        <Spin />
      ) : (
        data.data.map((el) => <ThingItem key={el.id} {...el} />)
      )}
    </div>
  );
};
