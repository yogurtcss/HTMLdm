import React,{Component} from 'react';
import {AppBar,Toolbar,IconButton,Typography,Button} from '@material-ui/core';

export default class Header extends Component{

    render(){
        return(
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">

                    </IconButton>
                    <Typography variant="h6">
                        我佛辣！
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        )
    }
}
