import React, { useState, useEffect } from "react";
import "./SearchBox.css";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
            .then((r) => r.json())
            .then((data) => {
                setSuggestions(data.products || []);
            })
            .catch(() => {
                setSuggestions([]);
            })
            .finally(() => setLoading(false));
    }, [query]);

    const clear = () => {
        setQuery("");
        setSuggestions([]);
    };

    const choose = (title) => {
        setQuery(title);
        setSuggestions([]);
    };

    return (
        <div className="sb-wrapper">
            <div className="sb-input-wrap">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="sb-input"
                />
                {query && (
                    <button aria-label="Clear search" className="sb-clear" onClick={clear}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" >
                            <path d="M18 6L6 18" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>

            {loading && <div className="sb-loading">Searching...</div>}

            {suggestions.length > 0 && (
                <ul className="sb-list">
                    {suggestions.map((s) => (
                        <li key={s.id} className="sb-item" onClick={() => choose(s.title)}>
                            <div className="sb-item-title">{s.title}</div>
                            <div className="sb-item-sub">{s.brand} • ${s.price}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
