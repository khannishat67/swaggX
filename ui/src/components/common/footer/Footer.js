import { Fab, Tooltip } from '@material-ui/core';
import { Home, Save } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import JSYAML from 'yaml';
import { stateToSwagger } from '../../../store/utils/StateToSwaggerUtil';
import DownloadModal from './DownloadModal';
import './Footer.less';
import NavigationAwayModal from './NavigationAwayModal';


export default (props) => {
    const [openNavModal, setOpenNavModal] = React.useState(false);
    const [openSaveModal, setOpenSaveModal] = React.useState(false);

    const handleNavOpen = () => {
        setOpenNavModal(true);
    };

    const handleNavClose = () => {
        setOpenNavModal(false);
    };

    const handleNavCloseConfirmed = () => {
        setOpenNavModal(false);
        home();
    }

    const handleSaveOpen = () => {
        setOpenSaveModal(true);
    };

    const handleSaveClose = () => {
        setOpenSaveModal(false);
    }

    const handleSaveCloseConfirmed = () => {
        setOpenSaveModal(false);
        onSave();
    }

    const swaggerObj = useSelector(state => {
        const { swagger } = state;
        return {
            fileInfo: swagger.fileInfo,
            swaggerDetails: {
                basicInfo: swagger.basicInfo,
                info: swagger.info,
                contact: swagger.contact,
                license: swagger.license,
                paths: swagger.paths,
                parameters: swagger.parameters,
                definitions: swagger.definitions
            }
        }
    });

    const onSave = () => {
        const fileName = (swaggerObj.fileInfo.fileName && swaggerObj.fileInfo.fileName !== '')
            ? swaggerObj.fileInfo.fileName.includes('.yaml')
                ? swaggerObj.fileInfo.fileName
                : (swaggerObj.fileInfo.fileName.includes('.json'))
                    ? `${swaggerObj.fileInfo.fileName.substr(0, swaggerObj.fileInfo.fileName.lastIndexOf('.'))}.yaml`
                    : `${swaggerObj.fileInfo.fileName}.yaml`
            : 'swagger.yaml';
        if (props.content && props.content !== "") {
            download(fileName, props.content);
        }
        else {
            let specContent = JSYAML.stringify(stateToSwagger(swaggerObj.swaggerDetails));
            download(fileName, specContent);
        }
    }

    const home = () => {
        props.history.push('/');
    }

    const download = (fileName, content) => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {// for IE
            window.navigator.msSaveOrOpenBlob(file, fileName);
        }
        else {
            element.href = URL.createObjectURL(file);
            element.download = fileName;
            document.body.appendChild(element);
            element.click();
        }
    }

    return (
        <>
            {openNavModal && <NavigationAwayModal
                open={openNavModal}
                handleCloseConfirmed={handleNavCloseConfirmed}
                handleClose={handleNavClose} />}
            {openSaveModal && <DownloadModal
                open={openSaveModal}
                handleCloseConfirmed={handleSaveCloseConfirmed}
                handleClose={handleSaveClose} />}
            <div className="flex-column action-fab">
                <Tooltip title="Save">
                    <Fab color="primary" aria-label="add" onClick={handleSaveOpen}>
                        <Save />
                    </Fab>
                </Tooltip>
                <Tooltip title="Home">
                    <Fab color="primary" aria-label="edit" className="mt-16" onClick={handleNavOpen}>
                        <Home />
                    </Fab>
                </Tooltip>
            </div>
        </>
    );
}