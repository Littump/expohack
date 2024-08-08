import { Login } from "@/modules/Login";
import { Navbar } from "@/modules/Navbar";
import { Layout } from "@/ui/Layout";

export const LoginPage = () => {
  return (
    <Layout top={<Navbar />}>
      <Login />
    </Layout>
  );
};
