import React, { useEffect, useState } from 'react'
import {
    Card,
    Spacer,
    Button,
    Text,
    Input,
  } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { blogService } from '../services/blog.service';

const createBlog = ({isNewBlogOpen}) => {
  const { data: session, status } = useSession()
  const [blogInfo, setBlogInfo] = useState({ title: '', body: '',image:'',authorName:"" });
  const [formError, setFormError] = useState({ status: 'default', message: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const[pageLoading,setPageLoading]=useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
    }
    else if (status == 'loading') {
      setPageLoading(true)
    } else{
        setBlogInfo({ ...blogInfo, authorName: session.user.name })
    }
  }, [session, status])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setBlogInfo({ ...blogInfo, image: base64String })
    };

    reader.readAsDataURL(file);
  };

  const updateBlogInfo = (field, value) => {
    switch (field) {
        case 'title':
            setBlogInfo({ ...blogInfo, title: value });
            break;
        case 'body':
            setBlogInfo({ ...blogInfo, body: value });
            break;
        case 'authorName':
            setBlogInfo({ ...blogInfo, authorName: value });
            break;
        case 'image':
            setBlogInfo({ ...blogInfo, image: value });
            break;
        default:
            console.log("No field defined")
    }
}

const validateFields = () => {
    const isBody = blogInfo.body && blogInfo.body.length > 0;
    const isTitle = blogInfo.title && blogInfo.title.length > 0;

    return (isBody && isTitle) ? true : false;
}

const onClickAdd = async () => {
    if (validateFields()) {
        setLoading(true);
        blogService.createBlog(blogInfo,session).then(async (res) => {
            if (res.status === 200 ) {
                setMsg(res.data.message);
                setLoading(false);
                await setTimeout(() => {
                    setBlogInfo({ title: '', body: '',image:'',authorName:"" })
                    isNewBlogOpen(false)
                }, 500);
            } else {
                setLoading(false);
                setFormError({
                    status: 'error',
                    message: res.message
                });
            }
        })
    } else {
        setLoading(false);
        setFormError({
            status: 'error',
            message: "Mandatory fields are empty!"
        });
    }
}



  return (
    <div>
        <Card css={{ mw: 'auto', p: '40px',background:"transparent" }}>
        <Text
          size={24}
          weight="bold"
          css={{
            as: 'center',
            mb: '20px',
          }}
        >
          Add New Blog
        </Text>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Title"
          label="Title *"
          type="text"
          onChange={(e) => updateBlogInfo('title', e.target.value)}
          status={formError.status}
        />
        <Spacer y={1} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Body"
          label="Body *"
          type="text"
          onChange={(e) => updateBlogInfo('body', e.target.value)}
          status={formError.status}
        />
        <Spacer y={1} />

<Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Image"
          label="Image (not reqired)"
          type="file"
          onChange={(e) => handleImageUpload(e)}
          status={formError.status}
        />
        <Spacer y={1} />
        <Button onClick={()=>{onClickAdd()}}>{!loading?"Add Blog":"Loading..."}</Button>

        {formError.message.length > 0 && <><Spacer y={1} />
                                <Text css={{ margin: 0 }} color="error">{formError.message}</Text>
                            </>}
                            {msg  && <><Spacer y={1} />
                                <Text css={{ margin: 0 }} color="success">{msg}</Text>
                            </>}
      </Card>
    </div>
  )
}

export default createBlog
