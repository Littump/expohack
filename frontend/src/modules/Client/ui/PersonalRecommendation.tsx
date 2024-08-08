import { useGetRecommendations } from "../api";
import { ThingItem } from "@/modules/Things";
import { Spin } from "@/ui/Spin";
import { Text } from "@/ui/Text";
import { useParams } from "react-router-dom";

export const PersonalRecommendation = () => {
  const { id } = useParams();
  const { data, isPending } = useGetRecommendations(id!);

  return (
    <div>
      <Text variant="l" className="mb-[43px] block">
        Рекомендации на основе истории покупок
      </Text>
      <div className="w-ful grid grid-cols-3 pt-[19px] pb-[9px] px-[25px] text-gray-300">
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
