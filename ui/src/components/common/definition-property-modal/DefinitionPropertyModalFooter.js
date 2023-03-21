import React from 'react';
import Button from '@material-ui/core/Button';
import * as resources from '../../../resources/resource-strings.json';

const DefinitionPropertyModalFooter = (props) => {
    return (
        <div className="definition-modal-footer">
            <Button variant="contained" color="primary" className="save" onClick={props.onSave}>{resources.definition.save}</Button>
            <Button variant="contained" onClick={props.handleClose} className="close">{resources.definition.cancel}</Button>
        </div>
    );
}
export default DefinitionPropertyModalFooter;
