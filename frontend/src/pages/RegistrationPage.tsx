import { Registration } from "@/modules/Login";
import { Navbar } from "@/modules/Navbar";
import { Layout } from "@/ui/Layout";

export const RegistrationPage = () => {
  return (
    <Layout top={<Navbar />}>
      <Registration />
    </Layout>
  );
};
