import { create } from "zustand";

type GenreStateT = {
    currentGenres: any[],
    setCurrentGenres: (genres: any[]) => void
}


export const useGenreState = create<GenreStateT>((set) => ({
    currentGenres: [],
    setCurrentGenres: (genres: any[]) => {
        set({ currentGenres: genres })
    },
}))
