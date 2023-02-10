import React from "react";
import TextInput from "../components/inputs/TextInput";
import SelectTypeInput from "../components/inputs/SelectTypeInput";
import { getUnique } from "../lib/config";
import { Page } from "../model/Pages";
import useAppContext from "../context/useAppContext";
import QuillEditor from './Quill';
import 'react-quill/dist/quill.snow.css';
import { format } from "fecha";


// bring user

const PagesList = ({ pages }) => {
  const { 
    user, 
    showLoading, 
    closeLoading,
    toggleModal 
  } = useAppContext();
  const [mode, setMode]         = React.useState('view'); 
  // create, edit, view
  const [current, setCurrent]   = React.useState(null); 
  const [name, setName]         = React.useState('');
  const [category, setCategory] = React.useState('');
  const [title, setTitle]       = React.useState('');
  const [desc, setDesc]         = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [content, setContent]   = React.useState('');

  const [pageslist, setPageslist] = React.useState(pages);


  const categories = [
    {name: 'Pages', value: 'pages'},
    {name: 'blog', value: 'blog'}
  ];
  
  const setPagesList = React.useCallback(async () => {
    try {
      if(mode == 'view'){
        const all = await Page.getAll(null, `created_date,desc`, null, 25);
        setPageslist({...all});
      }
    } catch (error) {
      console.log(error, ' fetching pages');
    }

  }, [pageslist, mode]);

  React.useEffect(() => {
    setPagesList();
  }, [pageslist]);

  const createPage = async () => {
    try {
      if(
        name.trim().length &&
        category.trim().length &&
        title.trim().length &&
        desc.trim().length &&
        keywords.trim().length &&
        content.trim().length
      ){
        // do the page creation
        const pageId = getUnique();
        const page = {
          name,
          title,
          desc,
          keywords,
          content,
          category,
          id:pageId,
          user_id: user.id,
          created_date: new Date()
        } 
        showLoading();
        const created = await Page.create({...page});
        closeLoading();
        if(created){
          setName('');
          setTitle('');
          setKeywords('');
          setDesc('');
          setContent('');
          setCategory('');
          setMode('view');
          setPagesList();
        }

      }else{
        toggleModal(
          'Error creating!',
          `Please check that you have provided the right infomation!`,
          'danger',
          'on'
        );
      }
    } catch (error) {
      closeLoading();
      console.log(error, 'error creating page');
      toggleModal(
        'Error creating!',
        error.message,
        'danger',
        'on'
      );
    }
  }
  const editPage = async () => {
    try {
      if(
        name.trim().length &&
        category.trim().length &&
        title.trim().length &&
        desc.trim().length &&
        keywords.trim().length &&
        content.trim().length &&
        current
      ){
        // do the page creation
        const page = {
          ...current,
          name,
          title,
          desc,
          keywords,
          content,
          category
        } 
        showLoading();
        const edited = await Page.update(current.id,{...page});
        console.log(edited, 'edit success');
        closeLoading();
        if(edited){
          toggleModal(
            'Update Success',
            `Page update successful`,
            'primary',
            'on'
          );
          setMode('view');
          setPagesList();
        }

      }else{
        toggleModal(
          'Error creating!',
          `Please check that you have provided the right infomation!`,
          'danger',
          'on'
        );
      }
    } catch (error) {
      closeLoading();
      console.log(error, 'error creating page');
      toggleModal(
        'Error creating!',
        error.message,
        'danger',
        'on'
      );
    }
  }

  const clearAll = () => {
    setName('');
    setTitle('');
    setKeywords('');
    setDesc('');
    setContent('');
    setCategory('');
  }

  const fillAll = ( doc ) => {
    setName(doc.name);
    setTitle(doc.title);
    setKeywords(doc.keywords);
    setDesc(doc.desc);
    setContent(doc.content);
    setCategory(doc.category)
  }


  return( 
    <>
    {(mode === 'view') && 
    <>
    <h6 className='text-muted mb-3 fw-bolder'>Recent Pages <button onClick={() => {
          clearAll();
          setMode('create');
        }} className="float-end btn btn-primary rounded-3 border-0 mb-3"> <i className="bi bi-node-plus"></i> New Page </button></h6>
    {(Object.keys(pageslist?pageslist:{}).length) ? <table className='table table-responsive table-hover table-borderless table-striped'>
      <thead>
        <tr className='text-muted'>
          <th>name</th>
          <th>Category</th>
          <th>Title</th>
          <th>Description</th>
          <th>Manage</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {pageslist.documents.map((doc, index) => <tr key={index}>
        <td className='fw-bold text-muted'>{doc.name}</td>
        <td className='fw-bold text-muted'>{doc.category}</td>
        <td className='fw-light'>{doc.title}</td>
        <td className='fw-light'>{doc.desc}</td>
        <td className='fw-light'><button onClick={() => {
          setMode('edit');
          setCurrent({...doc});
          fillAll(doc);
        }} className="btn btn-sm btn-primary"> <i className="bi bi-pencil-square"></i> Edit </button></td>
        <td className='fw-light'>{format((new Date((doc?.created_date?.seconds) * 1000)), 'MM-DD-YYYY [at] HH:mm:ss a')}</td>
      </tr>)}
      </tbody>
    </table>: <div className="d-flex w-100 h-100 align-items-center justify-content-center flex-column">
      <div className="mb-2">
        <h4 className="text-center text-muted">
          No pages yet
        </h4>
      </div>
      <div className="mb-2 text-center">
        <button onClick={() => {
          clearAll();
          setMode('create');
        }} className="btn btn-primary btn-lg">Create First Page</button>
      </div>
      </div>}
    </>}
    {
      (mode === 'create') &&
      <div className="p-2 p-lg-5">
        <h6 className='text-muted mb-3 fw-bolder mb-3'>New Page</h6>
        <SelectTypeInput 
          defaultContent=''  
          id={'category'}
          name='categories'
          label={'Select Page category'}
          data={categories}
          action={setCategory}
        />
        <TextInput
          name={'page_name'} 
          label={'Page Name (single word)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setName}
        />
        <TextInput
          name={'page_title'} 
          label={'Page Title (Max 120 chars)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setTitle}
        />
        <TextInput
          name={'page_desc'} 
          label={'Page Description (Max 120 chars)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setDesc}
        />
        <TextInput
          name={'key_words'} 
          label={'Page Keywords (Max 120 chars)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setKeywords}
        />
        <QuillEditor onChange={setContent} />
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary border-0 btn-lg"
            type="button"
            onClick={createPage}
          >
            Create Page 
          </button>
        </div>
      </div>
    }
    {
     ((mode === 'edit') && current) &&
     <div className="p-2 p-lg-5">
        <h6 className='text-muted mb-3 fw-bolder mb-3'>Edit {current.name} 
        <div className="float-end mb-3">
        <button onClick={() => {
          clearAll();
          setMode('view');
          setCurrent(null);
        }} className="btn btn-primary rounded-3 border-0 me-2"> <i className="bi bi-list-check"></i> List </button>

        <button onClick={() => {
          clearAll();
          setMode('create');
        }} className="btn btn-primary rounded-3 border-0 "> <i className="bi bi-node-plus"></i> New Page </button>
        </div>
        </h6>
        <SelectTypeInput 
          defaultContent={(current?.category)?(current?.category): ''}  
          id={'category'}
          name='categories'
          label={'Select Page category'}
          data={categories}
          action={setCategory}
        />
        <TextInput
          defaultValue={current.name}
          name={'page_name'} 
          label={'Page Name (single word)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setName}
        />
        <TextInput
          defaultValue={current.title}
          name={'page_title'} 
          label={'Page Title (Max 120 chars)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setTitle}
        />
        <TextInput
          defaultValue={current.desc}
          name={'page_desc'} 
          label={'Page Description (Max 120 chars)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setDesc}
        />
        <TextInput
          defaultValue={current.keywords}
          name={'key_words'} 
          label={'Page Keywords (Max 120 chars)'}
          type={'text'}
          reference={null}
          disabled={false}
          action={setKeywords}
        />
        <QuillEditor 
        onChange={setContent} 
        defaultContent={current.content}
        />
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary border-0 btn-lg"
            type="button"
            onClick={editPage}
          >
            Edit Page 
          </button>
        </div>

     </div> 
    }
    </>
    )
}

export const getServerSideProps = async() => {
  try {
    const pgs  = await Page.getAll(null,'created_date', null, 25);
    return {
      props: {
        pages: {...pgs}
      }
    } 
  } catch (error) {
    console.log(error, 'server side pages props error');
    return {
      props: {
        pages: null
      }
    }
  }
}  

export default PagesList;