import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Box, IconButton, Menu } from '@mui/material';
import { FC, MouseEventHandler, ReactNode, useState } from 'react';

interface Props {
  id: number | string;
  ClickableComp?: ReactNode;
  children?: ReactNode | Function;
}

const CustomMenu: FC<Props> = ({ id, ClickableComp = null, children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [anchorEl, setAnchorEl] = useState<null | any>(null);
  const open = Boolean(anchorEl);
  const handleClick: MouseEventHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id={`${id}-basic-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `${id}-options-button`,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box>{children ? children({ handleClose }) : null}</Box>
      </Menu>
      <Box
        id={`${id}-options-button`}
        aria-controls={open ? `${id}-basic-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        {ClickableComp || (
          <IconButton size="small">
            <MoreVertRoundedIcon fontSize="medium" />
          </IconButton>
        )}
      </Box>
    </>
  );
};

CustomMenu.defaultProps = {
  ClickableComp: undefined,
  children: undefined,
};

export default CustomMenu;
