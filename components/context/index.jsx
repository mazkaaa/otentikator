import { KeyProvider } from "./KeyProviderHandler";

export default function ContextProvider({ children }) {
  return <KeyProvider>{children}</KeyProvider>;
}
