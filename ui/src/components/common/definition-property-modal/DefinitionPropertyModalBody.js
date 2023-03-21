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

const DefinitionPropertyModalBody = (props) => {
    const params = props.property;
    const [dynamicProperty, setDynamicProperty] = React.useState('');

    const positions = props.selection && props.selection.type && props.selection.type === 'object' ?
        resources.definition.positions
        : resources.definition.positions.filter(item => item.id === 'sibling');

    const hiddenFields = props.hiddenFields && props.hiddenFields.length > 0 ? props.hiddenFields : [];

    useEffect(() => {
        setDynamicProperty(getDynamicPropValue(swaggerProps, params));
        // eslint-disable-next-line
    }, [params.type]);

    const onPropertyChange = (e) => {
        const { name, value } = onChangeHandler(e);
        if (name === "type") {
            resetPrevProperty(params.type);
        }
        props.onChange(name, value);
    }

    const resetPrevProperty = (oldType) => {
        props.onReset(onResetValue(swaggerProps, oldType, params));
    }

    const onDynamicChange = (e) => {
        setDynamicProperty(e.target.value);
    }

    const addDefProperty = () => {
        if (!Object.keys(params).includes(dynamicProperty)) {
            let propertyObj = getPropertyObject(swaggerProps, params, dynamicProperty);
            if(propertyObj)
                props.onChange(refactorPropertyName(dynamicProperty), propertyObj.default);
        }
    }

    const deleteDefProperty = (propertyName) => {
        props.onDeleteProperty(propertyName);
    }

    return (
        <div className="param-modal-body">
            

            {(props.selection && props.selection.type && !props.edit) ?
                (<ParameterSelect
                    key={`0341e695-f2ed-4272-8f6b-d141ad914882`}
                    id='0341e695-f2ed-4272-8f6b-d141ad91488e'
                    name='position'
                    type='select'
                    disabledFields={props.disabledFields}
                    params={params}
                    onChange={onPropertyChange}
                    deleteProperty={deleteDefProperty}
                    values={positions.map(item => item.value)}
                    showDelete={false}
                />) : null
            }
            <ParameterInput
                key={`7915eda4-3194-46e7-a312-a7fd874d8128`}
                id='7915eda4-3194-46e7-a312-a7fd874d8128'
                name='name'
                type='text'
                disabledFields={props.disabledFields}
                params={params}
                onChange={onPropertyChange}
                deleteProperty={deleteDefProperty}
                showDelete={false}
                showLabel={true}
            />
            <ParameterTextarea
                variant="outlined"
                key={`7256a5f9-0171-41f8-bd60-3555656395d1`}
                id='7256a5f9-0171-41f8-bd60-3555656395d1'
                name='description'
                params={params}
                onChange={onPropertyChange}
            />
            <ParameterInput
                key={`4516b837-1468-4100-ab94-843e72283ec0`}
                id='4516b837-1468-4100-ab94-843e72283ec0'
                name='label'
                type='text'
                disabledFields={props.disabledFields}
                params={params}
                onChange={onPropertyChange}
                deleteProperty={deleteDefProperty}
                showDelete={false}
                showLabel={true}
            />
            <div className="modal-body-row-ref align-items-center">
            <ParameterSelect
                key={`5e70d159-b8b9-4de3-8f37-e3094799d30d`}
                id='5e70d159-b8b9-4de3-8f37-e3094799d3ed'
                name='type'
                type='select'
                disabledFields={props.disabledFields}
                params={params}
                onChange={onPropertyChange}
                deleteProperty={deleteDefProperty}
                values={resources.definition.types.map(item => item.value)}
                showDelete={false}
            />
                {!hiddenFields.includes('array') &&
                    <ParameterCheckbox
                    key={`26227523-72bc-4908-a286-3ecb2d83372`}
                    id="26227523-72bc-4900-a286-3e0cb2d83372"
                    value="primary"
                    name='array'
                    params={params}
                    onChange={onPropertyChange}
                        label={resources.definition.array}
                        className="ml-6"
                        />
                }
            </div>
            

            <ParameterSelect
                key={`bfca01cf-ae15-4399-87be-c3ec4e23c6e1`}
                id='bfcae1cf-ae19-4399-87be-c3ec4e23c6el'
                name='required'
                type='select'
                disabledFields={props.disabledFields}
                params={params}
                onChange={onPropertyChange}
                deleteProperty={deleteDefProperty}
                values={[true, false]}
                showDelete={false}
            />

            <PropertySelector
                label={resources.parameter.properties}
                dynamicProperty={dynamicProperty}
                params={params}
                swaggerProps={swaggerProps}
                onDynamicPropChange={onDynamicChange}
                addProperty={addDefProperty}
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
                            onChange={onPropertyChange}
                            onChangeEnum={props.onChange}
                            deleteProperty={deleteDefProperty}
                        />)
                    })
            }
        </div>
    );
}

DefinitionPropertyModalBody.propTypes = {
    params: PropTypes.object,
    hiddenFields: PropTypes.array,
    disabledFields: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};
export default DefinitionPropertyModalBody;



