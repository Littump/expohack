import { Link } from "@/ui/Link";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const DEBOUNCE_TIME = 400;

interface IClientItemProps {
  id: string;
  isFavorite?: boolean;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>;
}

export const ClientItem = ({
  id,
  isFavorite: isFavouriteExternal,
  mutate,
}: IClientItemProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(
    isFavouriteExternal ?? false
  );

  const debouncedHandleSetFavourite = useCallback(
    debounce((newValue) => {
      if (newValue !== isFavouriteExternal) {
        mutate(id);
      }
    }, DEBOUNCE_TIME),
    [isFavourite]
  );

  const handleSetFavourite = useCallback(() => {
    setIsFavourite((state) => !state);
    debouncedHandleSetFavourite(!isFavourite);
  }, [setIsFavourite]);

  return (
    <div className="w-full flex justify-between pt-[19px] pb-[9px] pl-[25px] pr-[65px] border-b border-blue-200">
      <Link to={`/clients/${id}/cross-sales`}>{id}</Link>

      <span
        className={`cursor-pointer hover:text-orange ${
          isFavourite ? "text-orange" : "text-gray-200"
        }`}
        onClick={handleSetFavourite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[22px] h-[22px]"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};
