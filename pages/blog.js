import Blogs from "./components/Blogs";
import { Page } from "./model/Pages";

const BlogPage = ({ docs }) => {
  return (
    <Blogs docs={docs} />
  );
}

export const getServerSideProps = async() => {
  try {
    const page = await Page.getAll(null, `created_date,desc`, `category,==,blog`, 25);
    const rt = page?.documents;
    const d = rt?.map(dc => {
      const dt =  (dc?.created_date?.seconds * 1000)
      dc['created_date'] = dt;
      return dc; 
    });

    return {
      props: {
        docs: d
      }
    }
  } catch (error) {
    return {
      props: {
        docs: null
      }
    }
  }
}

export default BlogPage;