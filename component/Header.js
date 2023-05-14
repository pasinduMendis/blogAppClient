import React, { useEffect, useState } from 'react'
import { Navbar, Button, Link, Text,Grid,useViewport } from "@nextui-org/react";
import { useSession, signOut, getSession } from 'next-auth/react'

const Header = ({session,isSession,setisRegOpen,setisLoginOpen,isNewBlogOpen}) => {

  const [screenSize, setScreenSize] = useState('');
  const [ButtonSize, setButtonSize] = useState('lg');

  const collapseItems=[,
    <Button onClick={()=>{isNewBlogOpen(true)}} size={ButtonSize} color="success" auto css={{margin:"auto"}}>+ New Blog</Button>
  ]

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setScreenSize('lg');
        setButtonSize("lg")
      } else if (width >= 992) {
        setScreenSize('md');
        setButtonSize("lg")
      } else if (width >= 768) {
        setScreenSize('sm');
        setButtonSize("sm")
      } else {
        setScreenSize('xs');
        setButtonSize("xs")
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(screenSize)
  return (
    <div>

      <Navbar isBordered variant="floating"  css={{
        $$navbarBackgroundColor: 'transparent',
        $$navbarBlurBackgroundColor: 'transparent',
        position: 'relative',
      }}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Blog App
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
            <Grid.Container justify={screenSize=="sm"|| screenSize=="xs"?"flex-start":'flex-end'} alignContent='flex-end' css={{marginLeft:"auto"}}>
          {isSession && !(screenSize=="sm"|| screenSize=="xs") && <>
          <Button onClick={()=>{isNewBlogOpen(true)}} size={ButtonSize} color="success" auto css={{marginLeft:2}}>+ New Blog</Button>
          </>}
         {isSession?<>
            <Button size={ButtonSize} color="error" onClick={()=>{signOut()}} auto css={{marginLeft:2}}>log Out</Button>
         </>
         :
         <>
          <Button size={ButtonSize} auto css={{marginLeft:2}} onClick={()=>setisLoginOpen(true)}>login</Button>
          <Button size={ButtonSize} auto css={{marginLeft:2}} onClick={()=>setisRegOpen(true)}>register</Button></>
          }
          </Grid.Container>
          {isSession && <Navbar.Toggle aria-label="toggle navigation" css={{
            marginRight: 10,
            '@sm': {
              display: 'none',
            },
          }} />}
        </Navbar.Content>

          <Navbar.Collapse css={{}}>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            {item}
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      </Navbar>

    </div>
  )
}

export default Header