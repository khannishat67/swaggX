import { ClickAwayListener, FormControl, IconButton, InputAdornment, OutlinedInput, Tooltip } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import React, { useState } from 'react';
import ParameterProperty from './ParameterProperty';
import ParameterToolBar from './ParameterToolBar';

const ParameterHeader = (props) => {
    let { param } = props;
    const [open, setOpen] = useState(false);
    const handleTooltipToggle = () => {
        setOpen(!open);
    }
    const handleTooltipClose = () => {
        setOpen(false);
    }
    return (

        <div className="flex-row w-100">
            <FormControl variant="outlined" className="flex-grow">
                <OutlinedInput value={param.name} disabled endAdornment={
                    <InputAdornment position="end">
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip arrow open={open}
                                title={
                                    <React.Fragment>
                                        <ParameterProperty {...props} />
                                    </React.Fragment>
                                }
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener>
                                <IconButton edge="end" onClick={handleTooltipToggle}>
                                    <Info />
                                </IconButton>
                            </Tooltip>
                        </ClickAwayListener>
                        <ParameterToolBar {...props} handleOpen={props.handleOpen} />
                    </InputAdornment>
                } />
            </FormControl>
        </div>
    );
}
export default ParameterHeader;
