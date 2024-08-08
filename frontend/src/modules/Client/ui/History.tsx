import { ThingItem } from "@/modules/Things";
import { Spin } from "@/ui/Spin";
import { Text } from "@/ui/Text";
import { useGetHistory } from "../api";
import { useParams } from "react-router-dom";

export const History = () => {
  const { id } = useParams();
  const { data, isPending } = useGetHistory(id!);

  return (
    <div>
      <Text variant="l" className="mb-[43px] block">
        История покупок
      </Text>
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
