import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PreviewContent from "../contents/preview-content";
import MySearch from '../views/search-view';
import MyCard from "./my-card-preview";  //卡片集合，也称为 结果集

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,

    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="热点" {...a11yProps(0)} />
                <Tab label="搜索" {...a11yProps(1)} />
                <Tab label="推荐" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <PreviewContent />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MySearch/>
                <Route path="/homePage/searchRst" component={MyCard} />
                {/* 在这里嵌套路由：搜索结果页
                在这里进行局部刷新，而不会整个跳转页面
                */}
            </TabPanel>
            <TabPanel value={value} index={2}>
                推荐内容
                <MyCard/>
            </TabPanel>
        </div>
    );
}
