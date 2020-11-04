import React, { useCallback, useMemo } from 'react';
import { createEditor, Transforms, Editor } from 'slate';
import { Editable, Slate, useSelected, useSlate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { FiBold, FiImage, FiItalic, FiList, FiUnderline } from 'react-icons/fi';
import { useRef } from 'react';
import { NoticeContainer } from '../../styles/NoticeStyle';
import { EditorContainer, ToolBar, ButtonStyle } from './style';

const CustomEditor = {
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
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

const insertImage = (editor, url) => {
    const text = { text: '' };
    const image = [
        {
            type: 'image',
            url,
            children: [text],
        },
        {
            type: 'p',
            children: [{ text: '' }],
        },
    ];
    Transforms.unwrapNodes(editor, {
        match: (n) => !!(n.type === 'ol' || n.type === 'ul'),
        split: true,
    });

    Transforms.setNodes(editor, { type: 'p' });

    Transforms.insertNodes(editor, image);
};

const withImages = (editor) => {
    const { insertData, isVoid } = editor;

    editor.isVoid = (element) => {
        return element.type === 'image' ? true : isVoid(element);
    };

    editor.insertData = (data) => {
        const { files } = data;

        if (files && files.length > 0) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result;
                        insertImage(editor, url);
                    });

                    reader.readAsDataURL(file);
                }
            });
        } else {
            insertData(data);
        }
    };

    return editor;
};

const TextEditor = ({ value, setValue }) => {
    const imageInputRef = useRef();
    const editor = useMemo(
        () => withImages(withHistory(withReact(createEditor()))),
        [],
    );

    const ToggleButton = ({ tooltip, type, format, children }) => {
        const editorTest = useSlate();
        return (
            <ButtonStyle
                type="button"
                active={
                    type === 'mark'
                        ? CustomEditor.isMarkActive(editorTest, format)
                        : CustomEditor.isBlockActive(editorTest, format)
                }
                title={tooltip}
                onMouseDown={(event) => {
                    event.preventDefault();
                    type === 'mark'
                        ? CustomEditor.toggleMark(editorTest, format)
                        : CustomEditor.toggleBlock(editorTest, format);
                }}
            >
                {children}
            </ButtonStyle>
        );
    };

    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.b) {
            children = <strong>{children}</strong>;
        }
        if (leaf.i) {
            children = <em>{children}</em>;
        }
        if (leaf.u) {
            children = <u>{children}</u>;
        }

        return <span {...attributes}>{children}</span>;
    };

    const ImageElement = ({ attributes, children, element }) => {
        const selected = useSelected();
        return (
            <div
                style={{ display: 'flex', justifyContent: 'center' }}
                {...attributes}
            >
                <img
                    src={element.url}
                    alt="A"
                    style={{
                        outline:
                            selected && '2px solid var(--main-basic-color)',
                    }}
                />
                {children}
            </div>
        );
    };

    const renderElement = useCallback((props) => {
        const { attributes, children, element } = props;
        switch (element.type) {
            case 'h1':
                return <h1 {...attributes}>{children}</h1>;
            case 'h2':
                return <h2 {...attributes}>{children}</h2>;
            case 'h3':
                return <h3 {...attributes}>{children}</h3>;
            case 'ul':
                return <ul {...attributes}>{children}</ul>;
            case 'ol':
                return <ol {...attributes}>{children}</ol>;
            case 'li':
                return <li {...attributes}>{children}</li>;
            case 'image':
                return <ImageElement {...props} />;
            default:
                return <p {...attributes}>{children}</p>;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    const handleFileUpload = (e) => {
        const file = imageInputRef.current.files[0];
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
            reader.addEventListener('load', () => {
                const url = reader.result;
                insertImage(editor, url);
            });

            reader.readAsDataURL(file);
        }
        e.target.value = null;
    };

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(newValue) => setValue(newValue)}
        >
            <ToolBar>
                <ToggleButton tooltip="Negrito" type="mark" format="b">
                    <FiBold />
                </ToggleButton>
                <ToggleButton tooltip="Itálico" type="mark" format="i">
                    <FiItalic />
                </ToggleButton>
                <ToggleButton tooltip="Sublinhado" type="mark" format="u">
                    <FiUnderline />
                </ToggleButton>
                <ToggleButton tooltip="Header 1" type="block" format="h1">
                    H1
                </ToggleButton>
                <ToggleButton tooltip="Header 2" type="block" format="h2">
                    H2
                </ToggleButton>
                <ToggleButton tooltip="Header 3" type="block" format="h3">
                    H3
                </ToggleButton>
                <ToggleButton
                    tooltip="Lista não ordenada"
                    type="block"
                    format="ul"
                >
                    <FiList />
                </ToggleButton>
                <ToggleButton tooltip="Lista ordenada" type="block" format="ol">
                    1.
                </ToggleButton>
                <input
                    type="file"
                    id="selectFile"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                    ref={imageInputRef}
                />
                <ButtonStyle
                    type="file"
                    title="Anexar imagem"
                    onClick={(e) => {
                        e.preventDefault();
                        imageInputRef.current.click();
                    }}
                >
                    <FiImage />
                </ButtonStyle>
            </ToolBar>
            <EditorContainer>
                <NoticeContainer style={{ padding: 8 }}>
                    <Editable
                        style={{
                            minHeight: 160,
                        }}
                        placeholder="Escreva o noticiário aqui..."
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                const fragment = editor.getFragment();
                                if (fragment[0].type === 'image') {
                                    Transforms.select(editor, editor.selection);
                                    Transforms.insertNodes(editor, {
                                        type: 'h1',
                                        children: [{ text: '' }],
                                    });
                                    Transforms.delete(editor);
                                }
                                return;
                            }
                            if (e.ctrlKey && e.key === 'b') {
                                e.preventDefault();
                                CustomEditor.toggleMark(editor, 'b');
                            } else if (e.ctrlKey && e.key === 'i') {
                                e.preventDefault();
                                CustomEditor.toggleMark(editor, 'i');
                            } else if (e.ctrlKey && e.key === 'u') {
                                e.preventDefault();
                                CustomEditor.toggleMark(editor, 'u');
                            }
                        }}
                    />
                </NoticeContainer>
            </EditorContainer>
        </Slate>
    );
};

export default TextEditor;
