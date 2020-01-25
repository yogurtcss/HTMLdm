import React,{Component} from 'react';
import {Grid,Paper} from '@material-ui/core';

export default class Content extends Component{

    render(){
        return(
            <Grid container spacing={2}>
                <Grid item sm>
                    <Paper>
                        left
                    </Paper>
                </Grid>
                <Grid item sm>
                    <Paper>
                        right
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
