import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext();

export const useFavourites = () => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
};

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    // Load favourites from localStorage on mount
    useEffect(() => {
        const savedFavourites = localStorage.getItem('favourites');
        if (savedFavourites) {
            try {
                setFavourites(JSON.parse(savedFavourites));
            } catch (e) {
                localStorage.removeItem('favourites');
            }
        }
    }, []);

    // Save to localStorage whenever favourites change
    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (product) => {
        setFavourites(prev => {
            if (prev.find(item => item.id === product.id)) {
                return prev; // Already in favourites
            }
            return [...prev, product];
        });
    };

    const removeFromFavourites = (productId) => {
        setFavourites(prev => prev.filter(item => item.id !== productId));
    };

    const toggleFavourite = (product) => {
        if (isFavourite(product.id)) {
            removeFromFavourites(product.id);
        } else {
            addToFavourites(product);
        }
    };

    const isFavourite = (productId) => {
        return favourites.some(item => item.id === productId);
    };

    const getFavouritesCount = () => {
        return favourites.length;
    };

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        toggleFavourite,
        isFavourite,
        getFavouritesCount
    };

    return (
        <FavouritesContext.Provider value={value}>
            {children}
        </FavouritesContext.Provider>
    );
};

export default FavouritesContext;
