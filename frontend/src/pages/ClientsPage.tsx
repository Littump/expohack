import { Clients } from "@/modules/Clients";
import { MainLayout } from "@/modules/MainLayout";
import { Navbar } from "@/modules/Navbar";

export const ClientsPage = () => {
  return (
    <MainLayout top={<Navbar />}>
      <Clients />
    </MainLayout>
  );
};
