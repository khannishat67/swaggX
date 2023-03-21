import classNames from 'classnames';

export const styleSelector = (property, props) => {

    const isUsed = () => {
        return (props.used !== undefined && !props.used);
    }

    const isHeader = () => {
        return (props.used === undefined || props.used === true) && propType(props) === "header";
    }


    const isParam = () => {
        return (props.used === undefined || props.used === true) && (propType(props) === "query" || propType(props) === "path");
    }

    switch (property) {
        case 'container':
            return classNames('parameter-container', {
                //eslint-disable-next-line
                ['parameter-container-unused']: isUsed(),
                // eslint-disable-next-line
                ['parameter-container-header']: isHeader(),
                //eslint-disable-next-line
                ['parameter-container-parameter']: isParam()
            });
        case "header":
            return classNames('param-header', {
                //eslint-disable-next-line
                ['param-header-unused']: isUsed(),
                //eslint-disable-next-line
                ['param-header-header']: isHeader(),
                // eslint-disable-next-line
                ['param-header-parameter']: isParam()
            });

        case 'label':
            return classNames('param-label-container', {
                //eslint-disable-next-line
                ['param-label-container-unused']: isUsed(),
                //eslint-disable-next-line
                ['param-label-container-header']: isHeader(),
                //eslint-disable-next-line
                ['param-label-container-parameter']: isParam()
            });
        default:
            return null;
    }
}

export const propType = (props) => {
    return props.in;
}
export const paramLabel = (props) => {
    let type = propType(props);
    switch (type) {
        case "header":
            return "Header Param";
        case "query":
            return "Query Param";
        case "path":
            return "Path Param";
        default:
            return "Query Param";
    }
}
