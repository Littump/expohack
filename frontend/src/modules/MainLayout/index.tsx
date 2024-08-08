import { ILayoutProps, Layout } from "@/ui/Layout";

import { Link } from "@/ui/Link";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MainNavbar = () => {
  const links: {
    to: string;
    text: string;
  }[] = [
    {
      to: "/clients",
      text: "Клиенты",
    },
    {
      to: "/things",
      text: "Товары",
    },
    {
      to: "/favourites",
      text: "Избранное",
    },
  ];
  return (
    <div className="w-full flex gap-[102px] py-[35px] px-[93px]">
      {links.map((el) => (
        <Link to={el.to} key={el.to} className="font-semibold">
          {el.text}
        </Link>
      ))}
    </div>
  );
};

export const MainLayout = (props: ILayoutProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  return (
    <Layout {...props} contentClassName="px-[30px]">
      <div className="rounded-t-3xl  bg-blue-200 w-full mt-[65px]">
        <MainNavbar />
        <div className="rounded-t-3xl min-h-[80vh] bg-blue-100 w-full px-[93px]  py-[44px]">
          {props.children}
        </div>
      </div>
    </Layout>
  );
};
