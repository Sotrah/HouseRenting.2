import React, { useState, useEffect } from 'react';

const App = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('/CustomerUser/GetData')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <h1>Hi there</h1>
            {posts.map((post) => {
                return (
                    <div className="post-card" key={post.email}>
                        <p className="post-title">{post.email}</p>
                    </div>
                );
            })}
        </div>
);
};

export default App;