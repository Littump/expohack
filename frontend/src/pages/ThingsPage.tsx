import { Things } from "@/modules/Things";
import { MainLayout } from "@/modules/MainLayout";
import { Navbar } from "@/modules/Navbar";

export const ThingsPage = () => {
  return (
    <MainLayout top={<Navbar />}>
      <Things />
    </MainLayout>
  );
};
