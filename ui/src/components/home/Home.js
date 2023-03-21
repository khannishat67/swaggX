import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as resources from '../../resources/resource-strings.json';
import { resetSwagger } from '../../store/actions/SwaggerActions';
import WFSelect from '../common/controls/WFSelect';
import './Home.less';
import ImportSwaggerModal from './ImportSwaggerModal';

export default (props) => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('create');

    const [open, setOpen] = useState(false);
    const [version, setVersion] = useState('v2');
    const { history } = props;
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        switch (selectedOption) {
            case 'create':
                dispatch(resetSwagger());
                history.push('/swagger-builder');
                break;
            case 'edit':
                setOpen(true);
                break;
            default:
                history.push('/');
                break;
        }
    }
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    }
    const onVersionChange = (e) => {
        setVersion(e.target.value);
    }

    return (
        <div className='home'>
            {open ? <ImportSwaggerModal open={open} handleClose={handleClose}
                {...props} /> : null}
            <Container component="main" maxWidth="xs">
                <Paper className="p-16 pt-20 pb-20">
                    
                    <form className="home-form" onSubmit={onSubmit}>
                        <WFSelect name="version"
                            variant="outlined"
                            className='openapi-version'
                            label={resources.openapi_version}
                            labelid={resources.openapi_version}
                            labelselect={`${resources.openapi_version}-select`}
                            values={resources.openapi_versions}
                            value={version}
                            _onChange={onVersionChange}
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend"></FormLabel>
                            <RadioGroup aria-label="option" name="option"
                                value={selectedOption}
                                onChange={handleChange}>
                                <FormControlLabel value="create" control={<Radio />}
                                    label={resources.create_new_label} />
                                <FormControlLabel value="edit" control={<Radio />}
                                    label={resources.edit_label} />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            {resources.select_btn}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}