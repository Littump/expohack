import { Thing } from "@/modules/Thing";
import { MainLayout } from "@/modules/MainLayout";
import { Navbar } from "@/modules/Navbar";

export const ThingPage = () => {
  return (
    <MainLayout top={<Navbar />}>
      <Thing />
    </MainLayout>
  );
};
