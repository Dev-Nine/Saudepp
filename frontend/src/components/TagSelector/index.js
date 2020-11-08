import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useAxios } from '../../services/api';
import { Search, TagContainer, TagButton } from './style';

const TagSelector = ({ selectedTags, setSelectedTags }) => {
    const { data: tags, mutate } = useAxios('/tags?limit=200');
    const [unchosenTags, setUnchosenTags] = useState();

    useEffect(() => {
        if (selectedTags && tags) {
            const res = tags.filter((tag) => {
                selectedTags.some((selected) => {
                    return selected.id === tag.id;
                });
                return !selectedTags.some((selected) => {
                    return selected.id === tag.id;
                });
            });
            setUnchosenTags(res);
        } else {
            setUnchosenTags(tags);
        }
    }, [selectedTags, tags]);

    const handleSelectCategory = useCallback(
        (id) => {
            id = Number(id);
            if (!id || selectedTags.some((tag) => tag.id === id)) {
                return;
            }

            const selectedTag = tags.find((t) => {
                return t.id === id;
            });

            setSelectedTags([...selectedTags, selectedTag]);

            const updatedTags = tags.filter((tag) => tag.id !== id);
            mutate(updatedTags, false);
        },
        [mutate, selectedTags, setSelectedTags, tags],
    );

    const handleDeleteCategory = useCallback(
        (id) => {
            id = Number(id);
            const updatedTags = unchosenTags;
            const newTags = selectedTags.filter((t) => {
                if (t.id === id) {
                    updatedTags.push(t);
                    return false;
                }
                return true;
            });
            setSelectedTags(newTags);
            mutate(updatedTags, false);
        },
        [mutate, selectedTags, setSelectedTags, unchosenTags],
    );

    return (
        <>
            <Search>
                <select
                    onChange={(e) => handleSelectCategory(e.target.value)}
                    name="tags"
                    id="tags"
                    className="select-form"
                >
                    <option value="">Selecione as categorias</option>
                    {unchosenTags
                        ? unchosenTags.map((item) => (
                              <option key={item.id} value={item.id}>
                                  {item.description}
                              </option>
                          ))
                        : 'Carregando'}
                </select>
            </Search>
            <TagContainer>
                {selectedTags.map((item) => (
                    <TagButton
                        onClick={() => {
                            handleDeleteCategory(item.id);
                        }}
                        key={item.id}
                    >
                        <span>{item.description}</span>
                        <FiXCircle size={18} color="#fff" />
                    </TagButton>
                ))}
            </TagContainer>
        </>
    );
};

export default TagSelector;
