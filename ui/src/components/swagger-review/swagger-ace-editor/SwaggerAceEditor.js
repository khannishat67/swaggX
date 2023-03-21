import React, { useRef, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import _ from 'lodash';
import './SwaggerAceEditor.less';
import 'brace/mode/yaml';
import 'brace/theme/tomorrow_night_eighties';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import YAML from 'js-yaml';

import { swaggerToState } from '../../../store/utils/SwaggerToStateUtil';

export default (props) => {

    const editorRef = useRef(null);
    const currentContentRef = useRef(null);
    let timeoutRef = useRef(null);

    const [content, setContent] = useState('');
    const [annotations, setAnnotations] = useState([]);
    const [silent, setSilent] = useState(undefined);
    const [editorUpdate, setEditorUpdate] = useState(false);

    useEffect(() => {
        const editor = editorRef.current.editor;
        editor.$blockScrolling = Infinity;
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(!_.isEqual(props.swagger, currentContentRef.current)) {
            setContent(props.content);
        }
        //eslint-disable-next-line
    }, [props.content]);

    useEffect(() => {
        setAnnotations(props.errors);
    }, [props.errors]);

    useEffect(() => {
        editorRef.current.editor.resize(true);
        editorRef.current.editor.scrollToLine(props.jumpToLine, true, true, function () {});
        editorRef.current.editor.gotoLine(props.jumpToLine);
    }, [props.jumpToLine]);

    useEffect(() => {
        if(editorUpdate && (!silent || silent === true) && currentContentRef.current) {
            const newSwaggerObj = swaggerToState(currentContentRef.current);
            props.update(newSwaggerObj);
        }
        //eslint-disable-next-line
    }, [silent]);

    const onChange = (newValue) => {
        setEditorUpdate(true);
        setContent(newValue);
        const newSwagger = YAML.safeLoad(newValue);
        currentContentRef.current = newSwagger;
        setSilent(false);
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setSilent(true);
        }, 475);
    } 

    return (
        <AceEditor 
            ref={editorRef}
            className='wf-ace-editor'
            mode='yaml'
            theme='tomorrow_night_eighties'
            name='wf-swagger-ace-editor'
            value={content}
            annotations={annotations}
            tabSize={2}
            fontSize={14}
            useSoftTabs="true"
            wrapEnabled={true}
            editorProps={{
                "display_indent_guides": true,
                folding: "markbeginandend"
            }}
            setOptions={{
                cursorStyle: "smooth",
                wrapBehavioursEnabled: true
            }}
            onChange={onChange}
        />
    );
}