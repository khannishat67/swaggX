import React, { useState } from 'react';
import classNames from 'classnames';
import './SwitchViewIcon.less';

export default (props) => {
    const [toggle, setToggle] = useState(true);

    const _thumbnailClassStyle = () => {
        return classNames('switch-view-icon material-icons-outlined', {
            ['switch-view-icon-selected material-icons-outlined']: toggle //eslint-disable-line
        });
    };

    const _listClassStyle = () => {
        return classNames('switch-view-icon material-icons-outlined', {
            ['switch-view-icon-selected material-icons-outlined']: !toggle // eslint-disable-line
        });
    }

    const _onToggle = (key) => {
        setToggle(!toggle);
        if (props._onToggle)
            props._onToggle(key);
    };

    return (
        <div className="switch-view">
            <IconView className={_thumbnailClassStyle()}
                name="thumbnail" onClick={_onToggle}>view_module</IconView>
            <IconView className={_listClassStyle()}
                name="list" onClick={_onToggle}>view_list</IconView>
        </div>
    );
}

const IconView = (props) => {
    const _onClick = () => {
        props.onClick(props.name);
    }

    return (
        <i {...props} onClick={_onClick}>{props.children}</i>
    );

}