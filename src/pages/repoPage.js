import React from "react";
import "../style.css";

export default function RepoPage(props) {
  const { repo } = props.location.state;
  return (
    <div className="container">
      <h1>
        <a href={repo.html_url}>{props.match.params.repoId}</a>
      </h1>
      <p>{repo.description}</p>
      <ul className="repo-facts">
        <li>
          <b>Stars</b> - {repo.watchers}
        </li>
        <li>
          <b>Forks</b> - {repo.forks}
        </li>
        <li>
          <b>Open issues</b> - {repo.open_issues}
        </li>
      </ul>
      <button onClick={() => props.history.goBack()}>Go back</button>
    </div>
  );
}
