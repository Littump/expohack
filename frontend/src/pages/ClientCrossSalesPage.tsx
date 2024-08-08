import { Client, CrossSales } from "@/modules/Client";
import { MainLayout } from "@/modules/MainLayout";
import { Navbar } from "@/modules/Navbar";

export const ClientCrossSalesPage = () => {
  return (
    <MainLayout top={<Navbar />}>
      <Client>
        <CrossSales />
      </Client>
    </MainLayout>
  );
};
