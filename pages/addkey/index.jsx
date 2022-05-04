import Layout from "../../components/layouts/baseLayout";
import AddKeyForm from "../../components/reusables/add-key-form";
import Container from "../../components/styles/container";

const AddKey = () => {
  return (
    <Layout title="Add Key">
      <Container>
        <AddKeyForm />
      </Container>
    </Layout>
  );
};
export default AddKey;
