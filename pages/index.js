import { Container, Grid, Text, Input, Button, Modal } from "@nextui-org/react"
import Header from "../component/Header"
import { useEffect, useState } from "react"
import BlogListItem from "../component/blogListItem"
import Login from "../component/login"
import Register from "../component/register"
import { useSession } from "next-auth/react"
import CreateBlog  from "../component/createBlog"
import { blogService } from "../services/blog.service"
import SignleBlog from "../component/signleBlog"

export default function Home() {
  const [isSession, setisSession] = useState(false)
  const [isLoginOpen, setisLoginOpen] = useState(false)
  const [isSingleOpen, setisSingleOpen] = useState(false)
  const [isRegOpen, setisRegOpen] = useState(false)
  const [isNewBlogOpen, setNewBlogOpen] = useState(false)
  const [bolgId, setBlogId] = useState("")
  const [pageLoading, setPageLoading] = useState(true);
  const { data: session, status } = useSession()
  const [blogs,setBlogs]=useState([])
  const [blogFilter,setBlogFilter]=useState({ author: '', title: '' });
  

  useEffect(() => {
    if (status === 'unauthenticated') {
      setisSession(false)
    }
    else if (status == 'loading') {
      setPageLoading(true)
    } else{
      setisSession(true)
    }
  }, [session, status])

  useEffect(() => {
  blogService.getAllBlogs(blogFilter).then((res)=>{
    if(res.status==200){
      setBlogs(res.blogs)

    }
  })
  }, [])

  const updateBlogFilterInfo = (field, value) => {
    switch (field) {
        case 'author':
            setBlogFilter({ ...blogFilter, author: value });
            break;
        case 'title':
            setBlogFilter({ ...blogFilter, title: value });
            break;
        default:
            console.log("No field defined")
    }
}

  const onSearch=()=>{
    blogService.getAllBlogs(blogFilter).then((res)=>{
      if(res.status==200){
        setBlogs(res.blogs)
  
      }
    })

  }

  return (
    <>
      <Modal
        closeButton
        width="50vw"
        blur
        aria-labelledby="modal-title"
        css={{ background: "white" }}
        open={isLoginOpen}
        onClose={() => {
          setisLoginOpen(false);
        }}
      >
        <div>
          <Login
            isOpenLogin={(val) => {
              setisLoginOpen(val);
            }}
          />
        </div>
      </Modal>

      <Modal
        closeButton
        width="50vw"
        blur
        aria-labelledby="modal-title"
        css={{ background: "white" }}
        open={isRegOpen}
        onClose={() => {
          setisRegOpen(false);
        }}
      >
        <div>
          <Register
            isOpenReg={(val) => {
              setisRegOpen(val);
            }}
          />
        </div>
      </Modal>

      <Modal
        closeButton
        width="50vw"
        blur
        aria-labelledby="modal-title"
        css={{ background: "white" }}
        open={isNewBlogOpen}
        onClose={() => {
          setNewBlogOpen(false);
        }}
      >
        <div>
          <CreateBlog
            isNewBlogOpen={(val) => {
              setNewBlogOpen(val);
            }}
          />
        </div>
      </Modal>

      <Modal
        closeButton
        width="90vw"
        blur
        aria-labelledby="modal-title"
        css={{ background: "white",overflowY:"scroll"}}
        open={isSingleOpen}
        onClose={() => {
          setisSingleOpen(false);
        }}
      >
        <div>
          <SignleBlog
            blogId={bolgId}
          />
        </div>
      </Modal>

      <Header
        isSession={isSession}
        setisLoginOpen={(val) => setisLoginOpen(val)}
        setisRegOpen={(val) => setisRegOpen(val)}
        isNewBlogOpen={(val) => {
          setNewBlogOpen(val);
        }}
      />
      <div className={""}>
        <Container>
          <Grid.Container
            css={{
              padding: "10px",
            }}
          >
            <Grid lg={3} md={3} sm={3} xs={3} css={{ marginLeft: 3 }}>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Title"
                type="text"
                onChange={(e) => updateBlogFilterInfo("title", e.target.value)}
              />
            </Grid>
            <Grid lg={3} md={3} sm={3} xs={3} css={{ marginLeft:"10px" }}>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Author"
                type="text"
                onChange={(e) => updateBlogFilterInfo("author", e.target.value)}
              />
            </Grid>
            <Grid lg={3} md={3} sm={3} xs={3} css={{ marginLeft: 3 }}>
              <Button onClick={()=>{onSearch()}} size="auto" css={{paddingLeft:"10px",paddingRight:"10px",marginLeft:"auto"}}>SEARCH</Button>
            </Grid>
          </Grid.Container>
        </Container>
        <Container>
          {blogs &&
            blogs.length > 0 &&
            blogs.map((item, id) => {
              return (
                <Grid.Container
                  css={{
                    padding: "10px",
                    border: "1px solid lightblue",
                    borderRadius: "5px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onClick={()=>{setBlogId(item.blogId);setisSingleOpen(true)}}
                >
                  <Grid lg={12} md={12} sm={12} xs={12} key={id}>
                    <BlogListItem
                      title={item.title}
                      body={item.body}
                      author={item.author.name}
                      key={id}
                      image={item.image}
                      createdDate={item.createdDate}
                    />
                  </Grid>
                </Grid.Container>
              );
            })}
        </Container>
      </div>
    </>
  );
}
