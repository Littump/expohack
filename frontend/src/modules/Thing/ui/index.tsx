import { Spin } from "@/ui/Spin";
import { useGetRecommendation, useGetScript } from "../api";
import { Box } from "@/ui/Box";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "@/ui/Text";
import { Modal } from "@/ui/Modal";
import { ThingItem } from "@/modules/Things";
import { useCallback, useState } from "react";

export const Thing = () => {
  const [enabled, setIsEnabled] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const { id } = useParams();
  const { data: scriptData, isPending: scriptIsPending } = useGetScript(
    id!,
    enabled
  );
  const { data: dataRecommendations, isPending } = useGetRecommendation(id!);
  const navigate = useNavigate();
  const scriptText = scriptData?.data.text;

  const handleCopyToBuffer = useCallback(() => {
    setIsCopy(true);
    navigator.clipboard.writeText(scriptText ?? "");
    setTimeout(() => setIsCopy(false), 2000);
  }, [setIsCopy]);

  return (
    <div className="flex flex-col gap-[20px]">
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
      <Box>
        <Text variant="m" className="block font-light pb-[43px] !important">
          Товары для кросс-продажи
        </Text>
        <div className="w-full grid grid-cols-3 pt-[19px] pb-[9px] px-[25px] text-gray-300">
          <span>ID</span>
          <span>Компания</span>
          <span>Товар</span>
        </div>
        {!dataRecommendations || isPending ? (
          <Spin />
        ) : (
          dataRecommendations.data.map((el) => <ThingItem key={id} {...el} />)
        )}
      </Box>
      <div className="flex gap-[20px] flex-col mt-[40px] items-start">
        <Text variant="l" className="block">
          Персональная рекоммендация{" "}
        </Text>
        <Modal
          onTransitionEnter={() => setIsEnabled(true)}
          buttonContent="Получить"
          title="Персональная рекомендация"
        >
          {scriptIsPending && <Spin />}
          <Text variant="s">
            {!scriptIsPending &&
              (scriptText ? scriptText : "Не удалось получить скрипт")}
          </Text>
          {scriptText && (
            <button
              onClick={handleCopyToBuffer}
              className={`active:scale-90 w-52 items-center justify-center flex gap-2 hover:bg-gray-100 transition rounded-lg px-4 py-2 cursor-pointer`}
            >
              {isCopy ? (
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
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <>
                  Скопировать
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
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </>
              )}
            </button>
          )}
        </Modal>
      </div>
    </div>
  );
};
