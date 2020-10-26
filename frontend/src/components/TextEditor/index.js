import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Transforms, Text, Editor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { NoticeContainer } from '../../styles/NoticeStyle';

const CustomEditor = {
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);
        if (marks) {
            return marks[format] === true;
        }
        return false;
    },

    toggleMark(editor, format) {
        const isActive = CustomEditor.isMarkActive(editor, format);
        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    },
};

const TextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ]);

    const DefaultElement = ({ attributes, children }) => {
        return <p {...attributes}>{children}</p>;
    };

    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }

        return <span {...attributes}>{children}</span>;
    };

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (
        <NoticeContainer>
            <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => setValue(newValue)}
            >
                <div>
                    <button
                        type="button"
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleMark(editor, 'bold');
                        }}
                    >
                        Bold
                    </button>
                </div>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(e) => {
                        if (e.ctrlKey && e.key === 'b') {
                            e.preventDefault();
                            CustomEditor.toggleBoldMark(editor, 'bold');
                        }
                    }}
                />
            </Slate>
        </NoticeContainer>
    );
};

export default TextEditor;
