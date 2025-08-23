'use client'

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getBookmarks } from '../../../actions/getbookmarks';

export default function BookmarkReload() {

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const data = await getBookmarks();
            setBookmarks(data);
        }
        fetchBookmarks();
    }, []);

    return (
        <div>
            {bookmarks.map((bookmark) => (
                <div key={bookmark.id}>{bookmark.id}</div>
            ))}
        </div>
    );
}