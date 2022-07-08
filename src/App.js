import React from 'react';
import { useEffect, useState } from 'react';

function App() {
    const [repos, setRepos] = useState();
    useEffect(() => {
        fetch("https://api.github.com/search/repositories?q=stars:%3E1&sort=stars")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setRepos(result.items);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    return (
        <>
            <div className="header">
                <div className="header-right">
                    <a href="#source">View Source</a>
                </div>
                <h1>Popular⭐ Repo Finder</h1>
                <h2>Find repositories popular on GitHub!</h2>
            </div>
            <section id="repos">
                {
                    React.Children.toArray(
                        repos && repos.map((repo) => (
                            <div className="card">
                                <h3 id="stargazers">⭐{repo.stargazers_count}</h3>
                                <h4 id="project-name">{repo.name}</h4>
                                Owner: <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer">{repo.owner.login}</a>
                                <p>{repo.description}</p>
                                <br></br>
                                <div className="links">
                                    <a id="project-url" href={repo.html_url} target="_blank" rel="noopener noreferrer">View Source</a>
                                </div>
                            </div>
                        )
                        )
                    )}
            </section>
        </>
    )
}

export default App;