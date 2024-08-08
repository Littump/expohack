import { Navigate, useNavigate } from "react-router-dom";
import { TextInput } from "@/ui/TextInput";
import { useFormik } from "formik";
import { Button } from "@/ui/Button";
import { Link } from "@/ui/Link";
import login_bg from "@/assets/login_bg.png";
import * as yup from "yup";
import YupPassword from "yup-password";
import { LoginAbout } from "./LoginAbout";
import { Text } from "@/ui/Text";
import { useEffect } from "react";
import { useRegistration } from "../api/useRegistration";
YupPassword(yup);

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Введите почту")
    .email("Неверно указана почта"),
  password: yup
    .string()
    .typeError("Должно быть строкой")
    .required("Обязательное поле")
    .min(4, "Слишком простой"),
});

export const Registration = () => {
  const { mutate, isPending, data } = useRegistration();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (!isPending && data) {
      navigate("/login");
    }
  }, [isPending]);

  if (localStorage.getItem("token") !== null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-full flex-grow">
      <LoginAbout className="w-[665px] mt-[135px] px-[50px] flex-shrink-0 min-h-max" />
      <div
        style={{
          backgroundImage: `url(${login_bg})`,
          backgroundSize: "auto 100%",
        }}
        className="w-full pl-[140px] pt-[200px] min-h-max bg-scale backg bg-repeat-x"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[30px] items-start max-w-[600px]"
        >
          <Text variant="xl" isBold className="uppercase">
            Регистрация
          </Text>
          <TextInput
            placeholder="Корпоративная почта"
            name="username"
            error={Boolean(touched.username && errors.username)}
            value={values.username}
            onChange={handleChange}
          />
          <TextInput
            placeholder="Пароль"
            name="password"
            type="password"
            error={Boolean(touched.password && errors.password)}
            value={values.password}
            onChange={handleChange}
          />
          <div className="flex gap-4 items-center">
            <Button loading={isPending} type="submit">
              Создать аккаунт
            </Button>
            <Link to="/login">Уже есть аккаунт?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
