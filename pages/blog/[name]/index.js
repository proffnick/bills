import Blog from "@/pages/components/Blog";
import { Page } from "@/pages/model/Pages";

const BlogPage = ({ doc }) => {
  return (
    <Blog doc={doc} />
  );
}

export const getStaticPaths = async () => {
  try {
      const page = await Page.getAll(null, `created_date,desc`, `category,==,blog`, 25); 
      if((page?.documents)?.length){
        const paths = (page?.documents).map(dc => {
          dc['created_date'] = dc?.created_date?.toString();
          return {
            params: {name: dc.name}
          }
        });
        console.log(paths, 'paths');
        return {
          paths: paths,
          fallback: false
        }
      }else{
        return {
          paths:[]
        }
      }
  } catch (error) {
    console.log(error, 'static');
    return {
      paths:[]
    }
  }
}

export const getStaticProps = async (context) => {
  try {
      const page = await Page.getAll(null, `id`, `name,==,${context.params.name}`, 25);

      console.log(page, 'static');

      if((page?.documents)?.length){
        const dc = (page?.documents)?.[0];
        const dd = (dc?.created_date?.seconds * 1000);
        dc['created_date'] = dd;
        return{
          props: {
            doc: dc
          }
        }
      }else{
        return {
          props:{
            doc: null
          }
        }
      }
  } catch (error) {
    console.log(error, 'static');
    return {
      props:{
        doc: null
      }
    }
  }
}

export default BlogPage;