import { Clients } from "@/modules/Clients";
import { MainLayout } from "@/modules/MainLayout";
import { Navbar } from "@/modules/Navbar";

export const FavouritesPage = () => {
  return (
    <MainLayout top={<Navbar />}>
      <Clients showOnlyFavourites={true} />
    </MainLayout>
  );
};
