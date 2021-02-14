import React from 'react'
import { Drawer, makeStyles, Toolbar } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { IStore } from '../../models/store.interfaces';
import { SideBarListComponent } from '../';

const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideBar: React.FC<any> = (props: any) => {
  const classes = useStyles()
  const barData = useSelector((state: IStore) => state.opportunities?.search?.aggregators)
  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          {barData ? (
            <SideBarListComponent data={barData} />
          ) : (<div>Loading</div>)}
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default SideBar
