import { Link } from "@/ui/Link";
import { IThing } from "../types/responses";
import { Text } from "@/ui/Text";

export const ThingItem = ({ id, name, company }: IThing) => {
  return (
    <div className="w-full grid grid-cols-3 pt-[19px] pb-[9px] px-[25px] border-b border-blue-200">
      <Link to={`/thing/${id}`}>{id}</Link>
      <Text isBold>{company}</Text>
      <Text isBold>{name}</Text>
    </div>
  );
};
