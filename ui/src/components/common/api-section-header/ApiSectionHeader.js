import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import SwitchViewIcon from '../switch-icon/SwitchViewIcon';
import './ApiSectionHeader.less';

export default (props) => {

    return (
        <div className="api-section-view-container w-100">
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={props._onAddClick}
            >
                ADD
      </Button>
            {/* <SwitchViewIcon {...props} className="ml-auto" /> */}
        </div>
    );
}