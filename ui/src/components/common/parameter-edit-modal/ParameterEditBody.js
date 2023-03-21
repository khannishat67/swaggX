import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
    ParameterSelect, ParameterInput,
    ParameterTextarea, ParameterCheckbox,
    DynamicPropertyInput, PropertySelector,
    getDynamicPropValue, refactorPropertyName,
    onChangeHandler, onResetValue, getPropertyObject
} from '../controls/WFParameterEditInputComponents';

import * as resources from '../../../resources/resource-strings.json';
import * as swaggerProps from '../../../resources/swagger-config.json';
import { FormGroup } from '@material-ui/core';

const ParameterEditBody = (props) => {
    const { params } = props;
    const [dynamicProperty, setDynamicProperty] = React.useState('');
    const hiddenFields = props.hiddenFields && props.hiddenFields.length > 0 ? props.hiddenFields : [];

    useEffect(() => {
        setDynamicProperty(getDynamicPropValue(swaggerProps, params));
        //eslint-disable-next-line
    }, [params.type]);

    const onChange = (e) => {
        const { name, value } = onChangeHandler(e);
        if (name === "type") {
            resetProperty(params.type);
        }
        props.onChange(name, value);
    }

    const resetProperty = (oldType) => {
        props.onReset(onResetValue(swaggerProps, oldType, params));
    }

    const onDynamicPropChange = (e) => {
        setDynamicProperty(e.target.value);
    }

    const addProperty = () => {
        if (!Object.keys(params).includes(dynamicProperty)) {
            let propertyobj = getPropertyObject(swaggerProps, params, dynamicProperty);
            props.onChange(refactorPropertyName(dynamicProperty), propertyobj.default);
        }
    }

    const deleteProperty = (propertyName) => {
        props.onDeleteProperty(propertyName);
    }

    return (
        <div className="flex-column align-items-stretch">
            <FormGroup className="flex-row align-items-center">
                {!hiddenFields.includes('markRef') &&
                    <ParameterCheckbox
                        key={`dd95c4e2-32f0-47a-8da9-23aac6b213a3`}
                        id='dd95c4e2-32f-470a-8da9-23aac6b213a3'
                        value="primary"
                        name='markRef'
                        params={params}
                        onChange={onChange}
                        label={resources.parameter.mark_ref}
                    />
                }
                {!hiddenFields.includes('keyName') &&
                    <ParameterInput
                        key={`e8e86c69-70db-40cb-bc16-baef61d224bf`}
                        id='e8e86c69-70db-4ecb-bc16-baef61d224bf'
                        name='keyName'
                        type='text'
                        disabledFields={props.disabledFields}
                        params={params}
                        onChange={onChange}
                        deleteProperty={deleteProperty}
                        showDelete={false}
                        showLabel={false}
                    />
                }
            </FormGroup>
            <ParameterInput
                key={`2d43c264-8d7a-4804-8b99-85d6eaccb43e`}
                id='2d43c264-8d7a-4884-8b99-85d6eaccb43e'
                name='name'
                type='text'
                disabledFields={props.disabledFields}
                params={params}
                onChange={onChange}
                deleteProperty={deleteProperty}
                showDelete={false}
                showLabel={true}
            />
            <ParameterTextarea
                className="mb-16"
                key={`73fe5e3-a13e-45e8-b398-85fd4c8a908d`}
                id='73fe5e83-a13e-45e8-b398-85fd4c8a908d'
                name='description'
                params={params}
                label="description"
                onChange={onChange}
                variant="outlined"
            />


            {!hiddenFields.includes('in') && <ParameterSelect
                key={`118d37ae-6fa1-4e99-a694-e6be8f2e0add`}
                id='118d37ae-6fa1-4e99-a694-e6be8f2eadd'
                name='in'
                type='select'
                disabledFields={props.disabledFields}
                params={params}
                onChange={onChange}
                deleteProperty={deleteProperty}
                values={resources.parameter.ins.map(item => item.value)}
                showDelete={false}
            />}
            <div className="flex-row">
                <div className="w-49">

                    <ParameterSelect
                        key={`b7208ead-911f-4098-abc3-177eaa98cf85`}
                        id='b7200ead-911f-4098-abc3-177eaa98cf85'
                        name='type'
                        type='select'
                        disabledFields={props.disabledFields}
                        params={params}
                        onChange={onChange}
                        deleteProperty={deleteProperty}
                        values={resources.parameter.types.map(item => item.value)}
                        showDelete={false}
                    />
                </div>
                <div className="w-50 ml-6">

                    <ParameterSelect
                        key={`46ha9ef2-Desb-efd3-8063-6392ad0c0166`}
                        id='4Gbage12-desb-af23-8043-6392ad0c0166'
                        name='required'
                        type='select'
                        disabledhtelds={props.disabledfields}
                        params={params}
                        onChange={onChange}
                        deleteProperty={deleteProperty}
                        values={[true, false]}
                        showDelete={false}
                    />
                </div>
            </div>

            <PropertySelector
                label={resources.parameter.properties}
                dynamicProperty={dynamicProperty}
                params={params}
                swaggerProps={swaggerProps}
                onDynamicPropChange={onDynamicPropChange}
                addProperty={addProperty}
            />
            {
                Object.keys(params).filter(key => !swaggerProps.default.fixedFields.includes(key))
                    .map((item, index) => {
                        return (<DynamicPropertyInput
                            key={`${item.id}_${index}`}
                            name={item}
                            swaggerProps={swaggerProps}
                            params={params}
                            disabledFields={props.disabledFields}
                            onChange={onChange}
                            onChangeEnum={props.onChange}
                            deleteProperty={deleteProperty}
                        />)
                    })
            }
        </div>
    );
}
ParameterEditBody.propTypes = {
    params: PropTypes.object.isRequired,
    hiddenFields: PropTypes.array,
    disabledFields: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};
export default ParameterEditBody;






