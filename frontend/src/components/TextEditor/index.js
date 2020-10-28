import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Transforms, Text, Editor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { NoticeContainer } from '../../styles/NoticeStyle';
import { EditorContainer } from './style';

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

    isBlockActive(editor, format) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === format,
        });
        return !!match;
    },

    toggleBlock(editor, format) {
        const isActive = CustomEditor.isBlockActive(editor, format);
        const isList = !!(format === 'number-list' || format === 'bullet-list');

        Transforms.unwrapNodes(editor, {
            match: (n) =>
                !!(n.type === 'number-list' || n.type === 'bullet-list'),
            split: true,
        });

        let type = 'paragraph';
        if (!isActive) {
            if (isList) type = 'li';
            else type = format;
        }

        Transforms.setNodes(editor, {
            type,
        });

        if (!isActive && isList) {
            const block = { type: format, children: [] };
            Transforms.wrapNodes(editor, block);
        }
    },
};

const TextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ]);

    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }

        return <span {...attributes}>{children}</span>;
    };

    const DefaultElement = ({ attributes, children }) => {
        return <p {...attributes}>{children}</p>;
    };

    const H1Element = ({ attributes, children }) => {
        return <h1 {...attributes}>{children}</h1>;
    };

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'h1':
                return <H1Element {...props} />;
                break;
            case 'li':
                return <H1Element {...props} />;
                break;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (
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
                <button
                    type="button"
                    onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleBlock(editor, 'h1');
                    }}
                >
                    H1
                </button>
            </div>
            <EditorContainer>
                <NoticeContainer style={{ padding: 8 }}>
                    <Editable
                        style={{
                            minHeight: 160,
                        }}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={(e) => {
                            if (e.ctrlKey && e.key === 'b') {
                                e.preventDefault();
                                CustomEditor.toggleMark(editor, 'bold');
                            }
                        }}
                    />
                </NoticeContainer>
            </EditorContainer>
        </Slate>
    );
};

export default TextEditor;
