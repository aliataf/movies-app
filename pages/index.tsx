import Layout from "components/Layout";
import useUser from "lib/useUser";

export default function Home() {
  useUser({
    redirectTo: "/movies",
    redirectIfFound: true,
  });

  return (
    <Layout>
      <h1>Welcome to Movies App</h1>

      <p>Please login using Github in order to see movies</p>
    </Layout>
  );
}
