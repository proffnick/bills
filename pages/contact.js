import Contact from "./components/Contact";
import { Page } from "./model/Pages";

const ContactPage = ({ doc }) => {
  return (
    <Contact doc={doc} />
  );
}

export const getServerSideProps = async() => {
  try {
    const page = await Page.getAll(null, `created_date,desc`, `name,==,contact`, 1);
    const rt = page?.documents?.[0];
    delete (rt?.created_date)
    return {
      props: {
        doc: rt
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error), 'Error gettting page');
    return {
      props: {
        doc: null
      }
    }
  }
}

export default ContactPage;