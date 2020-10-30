import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Transforms, Editor } from 'slate';
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
        const isList = !!(format === 'ol' || format === 'ul');

        Transforms.unwrapNodes(editor, {
            match: (n) => !!(n.type === 'ol' || n.type === 'ul'),
            split: true,
        });

        let type = 'p';
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
            type: 'p',
            children: [{ text: '' }],
        },
    ]);

    const ToggleButton = ({ tooltip, type, format, children }) => {
        return (
            <button
                type="button"
                title={tooltip}
                onMouseDown={(event) => {
                    event.preventDefault();
                    type === 'mark'
                        ? CustomEditor.toggleMark(editor, format)
                        : CustomEditor.toggleBlock(editor, format);
                }}
            >
                {children}
            </button>
        );
    };

    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.b) {
            children = <strong>{children}</strong>;
        }

        return <span {...attributes}>{children}</span>;
    };

    const renderElement = useCallback(({ attributes, children, element }) => {
        switch (element.type) {
            case 'h1':
                return <h1 {...attributes}>{children}</h1>;
            case 'ul':
                return <ul {...attributes}>{children}</ul>;
            case 'li':
                return <li {...attributes}>{children}</li>;
            default:
                return <p {...attributes}>{children}</p>;
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
                <ToggleButton tooltip="Negrito" type="mark" format="b">
                    B
                </ToggleButton>
                <ToggleButton tooltip="Header 1" type="block" format="h1">
                    H1
                </ToggleButton>
                <ToggleButton tooltip="Lista" type="block" format="ul">
                    UL
                </ToggleButton>
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
                            // unfinished, vou arrumar dps
                            if (e.ctrlKey && e.key === 'b') {
                                e.preventDefault();
                                CustomEditor.toggleMark(editor, 'b');
                            }
                        }}
                    />
                </NoticeContainer>
            </EditorContainer>
        </Slate>
    );
};

export default TextEditor;
