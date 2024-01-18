import React, { ReactNode } from 'react'
import MDX from './MDXRenderer'
import { Box, Typography } from '@mui/material'

interface FITB_TextProps {
    text: string,
    children: ReactNode
}

export default function FITB_Text({children} : FITB_TextProps) {

    return (
        <Box display={'flex'} flexDirection={'row'} gap={1}>
            {React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                    return (
                        <Typography>
                            <MDX value = {child}/>
                        </Typography>
                    )
                }
                return child
            })}
        </Box>
    )
    



        
}