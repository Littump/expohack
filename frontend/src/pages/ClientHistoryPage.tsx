import { Client, History } from "@/modules/Client";
import { MainLayout } from "@/modules/MainLayout";
import { Navbar } from "@/modules/Navbar";

export const ClientHistoryPage = () => {
  return (
    <MainLayout top={<Navbar />}>
      <Client>
        <History />
      </Client>
    </MainLayout>
  );
};
