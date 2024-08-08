import { Box } from "@/ui/Box";
import { Link } from "@/ui/Link";
import { Text } from "@/ui/Text";
import { PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface IClientProps extends PropsWithChildren {}

const links: { to: string; text: string }[] = [
  { to: "cross-sales", text: "Кросс-продажи" },
  { to: "personal-recommendation", text: "Персональные рекоммендации" },
  { to: "history", text: "История покупок" },
];

export const Client = ({ children }: IClientProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[20px] min-h-max flex-grow h-full">
      <button className="flex gap-1 items-center" onClick={() => navigate(-1)}>
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
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>{" "}
        Назад
      </button>
      <Text isBold variant="m" className="px-[25px]">
        № {id}
      </Text>
      <Box className="">
        <div className="w-full flex gap-[102px] pb-[10px]">
          {links.map((el) => (
            <Link to={`/clients/${id}/${el.to}`} end key={el.to}>
              {el.text}
            </Link>
          ))}
        </div>
        <div className="mt-[82px] min-h-max">{children}</div>
      </Box>
    </div>
  );
};
