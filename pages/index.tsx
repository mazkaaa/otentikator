import H2 from "@/components/reusables/typography/h2";
import H4 from "@/components/reusables/typography/h4";
import { useKey } from "../components/context/keyProvider";
import KeyCard from "../components/reusables/keyCard";

export default function Home() {
  const { data } = useKey();

  return (
    <div className="w-full pt-12">
      {data.length === 0 ? (
        <div className="flex justify-center">
          <H4>You dont have any keys :(</H4>
        </div>
      ) : (
        <>
          {data.map((item) => (
            <KeyCard
              issuer={item.issuer}
              label={item.label}
              created_at={item.created_at}
              secret={item.secret}
              key={item.created_at}
            />
          ))}
        </>
      )}
    </div>
  );
}
