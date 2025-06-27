import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";

interface DrawerListProps {
  toggleDrawer: (open: boolean) => () => void;
  setFilter: (filter: string) => void;
}
const DrawerList = ({ toggleDrawer, setFilter }: DrawerListProps) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} /> */}
            {/* <Box className=" bg-white  rounded mt-2 w-full sm:w-40 "> */}
            <Button sx={{ color: "black" }} onClick={() => setFilter("cheap")}>
              Cheap
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => setFilter("expensive")}
            >
              Expensive
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => setFilter("popular")}
            >
              Popular
            </Button>

            {/* </Box> */}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {/* <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
    </Box>
  );
};

export default DrawerList;
