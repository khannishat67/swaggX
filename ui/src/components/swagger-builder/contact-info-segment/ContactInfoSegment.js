import { Chip, IconButton, TextField, Typography } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as resourceString from '../../../resources/resource-strings.json';
import { setContactInfo } from '../../../store/actions/SwaggerActions';
import './ContactInfoSegment.less';

export default () => {
    const dispatch = useDispatch();
    const { contact } = useSelector(state => (
        {
            contact: state.swagger.contact.toJS()
        }
    ));

    const [state, setState] = useState({
        email: '',
        emails: contact && contact.email ? contact.email.split(',') : []
    });

    const _addEmails = () => {
        dispatch(setContactInfo("email", [...state.emails, state.email]));
        setState(prevState => ({
            prevState,
            emails: [...prevState.emails, state.email],
            email: ''
        }));
    };

    const _onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        switch (key) {
            case "email":
                setState(prevState => ({
                    ...prevState,
                    email: value
                }));
                break;
            case "name":
                dispatch(setContactInfo(key, value));
                break;
            case "url":
                dispatch(setContactInfo(key, value));
                break;
            default:
                break;
        }
    };

    const _onDelete = (email) => {
        let newEmails = state.emails.filter((value, index) => {
            return value !== email;
        });
        dispatch(setContactInfo("email", [...newEmails]));
        setState(prevState => ({
            ...prevState,
            emails: [...newEmails]
        }));
    };

    const _renderEmails = () => {
        if (state.emails && state.emails.length > 0) {
            return (
                <div className="email-list-container">
                    {
                        state.emails.map((email, index) => {
                            return (
                                <Chip key={`email_${index}`} label={email} onDelete={() => _onDelete(email)} />
                            );
                        })
                    }
                </div>
            );
        };

        return undefined;
    };


    return (
        <div className="contact-container mt-16">
            <Typography variant="subtitle1" className="mb-8">{resourceString["basic_info"].contact}</Typography>
            <div className="info-row">
                <TextField id="contact-name" name="name"
                    label={resourceString["basic_info"].name}
                    onChange={_onChange}
                    value={contact ? contact.name : ""}
                    className="w-49" variant="outlined" />
                <TextField id="contact-url" name="url"
                    label={resourceString["basic_info"].url}
                    onChange={_onChange}
                    value={contact ? contact.url : ""}
                    className="w-49 ml-8" variant="outlined"
                />
            </div>
            <div className="info-row">
                <div className="email-container w-100">
                    <div className="email-input-container w-100">
                        <TextField id="contact-email" name="email"
                            type="email"
                            label={resourceString["basic_info"].email}
                            value={state.email}
                            onChange={_onChange}
                            variant="outlined"
                            className="w-49"

                        />
                        <IconButton color="primary" onClick={_addEmails}><AddBox /></IconButton>
                    </div>
                    {_renderEmails()}
                </div>
            </div>
        </div>
    );
}