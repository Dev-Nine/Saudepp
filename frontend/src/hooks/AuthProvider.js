import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const token = localStorage.getItem('@Saude:token');
        const user = localStorage.getItem('@Saude:user');

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;

            return { token, user: JSON.parse(user) };
        }

        return {};
    });

    const updateAvatar = (imageId, imageType) => {
        console.log(imageId, imageType);
        setData((oldData) => {
            if (!imageId) {
                oldData.user.imageUrl = `https://ui-avatars.com/api/?background=0086e6&bold=true&color=fff&uppercase=false&size=256&name=${oldData.user.name}`;
            } else {
                oldData.user.imageUrl = `https://res.cloudinary.com/saudepp/image/upload/${imageId}.${imageType}`;
            }
            localStorage.setItem('@Saude:user', JSON.stringify(oldData.user));
            return oldData;
        });
    };

    const signIn = useCallback(async ({ email, username, password }) => {
        let signInData;

        if (email) {
            signInData = { email, password };
        } else {
            signInData = { username, password };
        }

        const response = await api.post('/sessions', signInData);

        if (response) {
            const { token, user } = response.data;

            if (!user.imageId) {
                user.imageUrl = `https://ui-avatars.com/api/?background=0086e6&bold=true&color=fff&uppercase=false&size=256&name=${user.name}`;
            } else {
                user.imageUrl = `https://res.cloudinary.com/saudepp/image/upload/${user.imageId}.${user.imageType}`;
            }

            delete user.imageId;
            delete user.imageType;

            api.defaults.headers.authorization = `Bearer ${token}`;
            localStorage.setItem('@Saude:token', token);
            localStorage.setItem('@Saude:user', JSON.stringify(user));

            setData({ token, user });
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@Saude:token');
        localStorage.removeItem('@Saude:user');
        api.defaults.headers.authorization = '';

        setData({});
    }, []);

    useEffect(() => {
        if (!data.token) {
            return;
        }

        api.get('sessions').catch(() => {
            signOut();

            alert('Sessão expirada, entre novamente.');
        });
    }, [data.token, signOut]);

    return (
        <AuthContext.Provider
            value={{ user: data.user, signIn, signOut, updateAvatar }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
