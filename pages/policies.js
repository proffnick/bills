import Policy from "./components/Policy";
import { Page } from "./model/Pages";

const Policies = ({ doc }) => {
  return (
    <Policy doc={doc} />
  );
}

export const getServerSideProps = async() => {
  try {
    const page = await Page.getAll(null, `created_date,desc`, `name,==,policies`, 1);
    const rt = page?.documents?.[0];
    delete (rt?.created_date)
    return {
      props: {
        doc: rt
      }
    }
  } catch (error) {
    return {
      props: {
        doc: null
      }
    }
  }
}

export default Policies;