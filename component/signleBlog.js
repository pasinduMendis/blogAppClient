import React, { useEffect, useState } from 'react'
import { blogService } from '../services/blog.service'
import { Container, Grid, Image } from '@nextui-org/react'

const signleBlog = ({blogId}) => {
    const [blogs,setBlogs]=useState({})

    useEffect(() => {
        blogService.getSingleBlog(blogId).then((res)=>{
            console.log(blogId)
          console.log("single :",res)
          if(res.status==200){

            setBlogs(res.blogs)
      
          }
        })
        }, [])

  return (
    <div>
    {blogs &&  blogs?.author?.name  && <Container>
            <Grid.Container css={{paddingBottom:"10px",paddingRight:"20px"}}>
            <Grid lg={12} md={12} sm={12} xs={12}>
                <h3>{blogs.title}</h3>
                </Grid>
                <Grid lg={3} md={4} sm={12} xs={12}>
                <p style={{ fontWeight: 'bold',color:"blue" }}>{blogs?.author?.name}</p>
                </Grid>
                <Grid lg={3} md={4} sm={6} xs={6} >
                <p style={{ color: 'gray', fontStyle: 'italic' }}>{blogs.createdDate}</p>
                </Grid>
                {blogs.image && <Grid lg={12} md={12} sm={12} xs={12} justify='' css={{marginTop:"5px",paddingRight:"20px"}}>
                <Image
                      src={blogs.image}
                      alt="Image Description"
                      width="auto"
                      height={"auto"}
                    />
                </Grid>}

              <Grid lg={12} md={12} sm={12} xs={12} css={{marginTop:"5px"}}>
               <p style={{width:"90%",}}>{blogs.body}</p>
                </Grid>
                
                
                
            </Grid.Container>
        </Container>}
    </div>
  )
}

export default signleBlog