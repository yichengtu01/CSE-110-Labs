import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import{Note} from "./types";


export type LikeButtonProps ={
    note: Note;
    onToggleLike: () => void;
}

export function LikeButton( { note, onToggleLike }: LikeButtonProps ) {
    const [liked, setLiked] = useState(note.liked);

    const handleToggleLike = () => {
        note.liked = !liked;
        setLiked(!liked); 
        onToggleLike();
    };

    return (
        
        <div>
        <button data-testid={"likebut"+note.id} onClick={handleToggleLike}>
            <img
                src = {liked?"https://img.icons8.com/ios-filled/50/ff0000/like--v1.png":"https://img.icons8.com/ios/50/000000/like--v1.png"}
                width="18" 
                height="18" 
            />
        </button>
        </div>

        
    );
}