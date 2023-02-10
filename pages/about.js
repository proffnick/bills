import About from "./components/About";
import { Page } from "./model/Pages";

const AboutPage = ({ doc }) => {
  return (
    <About doc={doc} />
  );
}

export const getServerSideProps = async() => {
  try {
    const page = await Page.getAll(null, `created_date,desc`, `name,==,about`, 1);
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

export default AboutPage;