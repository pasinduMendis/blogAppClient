import React from 'react'
import { Container, Grid, Text, Input, Button, Image } from "@nextui-org/react"

const blogListItem = ({createdDate,image,title,body,author}) => {
  return (
    <div>
    <Container>
            <Grid.Container>
            <Grid lg={12} md={12} sm={12} xs={12}>
                <h3>{title}</h3>
                </Grid>
              <Grid lg={image?8:12} md={image?8:12} sm={12} xs={12} >
               <p>{body}</p>
                </Grid>
                {image && <Grid lg={3} md={3} sm={12} xs={12} justify=''>
                <Image
                      src={image}
                      alt="Image Description"
                      width="100%"
                      height={200}
                    />
                </Grid>}
                <Grid lg={3} md={4} sm={12} xs={12}>
                <p style={{ fontWeight: 'bold',color:"blue" }}>{author}</p>
                </Grid>
                <Grid lg={3} md={4} sm={6} xs={6} >
                <p style={{ color: 'gray', fontStyle: 'italic' }}>{createdDate}</p>
                </Grid>
                
            </Grid.Container>
        </Container>
    </div>
  )
}

export default blogListItem