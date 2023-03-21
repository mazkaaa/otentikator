import KeyCardHandler from "@/components/reusables/keyCard/index.hook";
import H4 from "@/components/reusables/typography/h4";
import { useKey } from "../components/context/keyProvider";
import KeyCard from "../components/reusables/keyCard";

export default function Home() {
  const { data } = useKey();
  const { generateToken, handleCopyToClipboard, handleDelete, percentage } =
    KeyCardHandler();

  return (
    <div className="w-full pt-12">
      {data.length === 0 ? (
        <div className="flex justify-center">
          <H4 fontBold={false}>You dont have any keys :(</H4>
        </div>
      ) : (
        <>
          {data.map((item) => (
            <KeyCard
              generatedToken={generateToken(
                item.secret,
                item.label,
                item.issuer
              )}
              issuer={item.issuer}
              label={item.label}
              onClickCopy={() => handleCopyToClipboard(item.secret)}
              onClickDelete={() => handleDelete(item.created_at)}
              percentage={percentage}
              key={item.created_at}
            />
          ))}
        </>
      )}
    </div>
  );
}
