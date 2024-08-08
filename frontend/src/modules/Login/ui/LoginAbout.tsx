import { Text } from "@/ui/Text";
import classNames from "classnames";
import okay from "@/assets/okay_icon.svg";
import { memo } from "react";
interface ILoginAbout {
  className?: string;
}

export const LoginAbout = memo(({ className }: ILoginAbout) => {
  const plusses = [
    "Повышаем лидогенерацию за счет формирования кросс - продаж",
    "Генерируем скрипт для продажи",
    "Создаем рекомендации на основе интересов и предпочтений пользователя",
  ];

  return (
    <div className={classNames(className, "flex flex-col gap-[67px]")}>
      <Text variant="xl" className="uppercase ">
        Система управления клиентскими базами
      </Text>
      {plusses.map((plus) => (
        <Text variant="s" key={plus} className="flex gap-[31px] items-center">
          <img src={okay} alt="plus" />
          {plus}
        </Text>
      ))}
    </div>
  );
});
