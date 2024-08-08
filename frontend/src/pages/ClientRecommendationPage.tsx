import { Client, PersonalRecommendation } from "@/modules/Client";
import { MainLayout } from "@/modules/MainLayout";
import { Navbar } from "@/modules/Navbar";

export const ClientRecommendationPage = () => {
  return (
    <MainLayout top={<Navbar />}>
      <Client>
        <PersonalRecommendation />
      </Client>
    </MainLayout>
  );
};
