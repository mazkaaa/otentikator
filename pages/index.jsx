import { useContext } from "react";
import KeyCard from "../components/reusables/keyCard";
import { KeyContext } from "../components/context/KeyProviderHandler";
import Layout from "../components/layouts/baseLayout";
import Container from "../components/reusables/styles/container";

export default function Home() {
  const { getKeys, loading } = useContext(KeyContext);

  return (
    <Layout title="Home">
      <Container>
        {loading ? (
          <div className="flex w-full justify-center flex-col items-center">
            <h1>Loading...</h1>
          </div>
        ) : (
          <div
            className={`flex w-full flex-col ${
              getKeys().length === 0 ? "justify-center" : "justify-start"
            }`}
          >
            {getKeys().map((key) => {
              return (
                <KeyCard
                  key={key.created}
                  issuer={key.issuer}
                  label={key.label}
                  secret={key.secret}
                  index={key.created}
                />
              );
            })}
            {getKeys().length === 0 && (
              <h1 className="text-xl font-medium text-center">
                Start adding your key!
              </h1>
            )}
          </div>
        )}
      </Container>
    </Layout>
  );
}
