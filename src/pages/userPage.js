import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import RepoPage from "./repoPage";
import "../style.css";

export default class UserPage extends Component {
  state = {
    user: {},
    userRepos: [],
    loading: true
  };

  componentDidMount = async () => {
    try {
      // Pass the param :id to the API call
      const response = await fetch(
        `https://api.github.com/users/${this.props.match.params.id}`
      );
      // read and parse the data using json() to create a JavaScript object
      const user = await response.json();
      // update the state with the user object
      this.setState({ user });
      // fetch the users repos
      const userRepos = await this.fetchRepos();
      this.setState({ userRepos, loading: false });
    } catch (error) {
      // We're not going to focus on handling the error in this part in this tutorial.
      this.setState({ loading: false });
    }
  };

  fetchRepos = async () => {
    const response = await fetch(
      `https://api.github.com/users/${this.props.match.params.id}/repos?sort=updated`
    );
    const json = await response.json();
    return json.slice(0, 10);
  };

  render() {
    const { loading, user, userRepos } = this.state;
    return (
      <Switch>
        <Route exact path={this.props.match.path}>
          <div className="container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="bio">
                <img src={user.avatar_url} alt={user.username} />
                <div>
                  <h1>{user.name}</h1>
                  <p>{user.bio}</p>
                  <div className="bio-details">
                    <p>{user.location}</p>
                    <a href={user.blog}>{user.blog}</a>
                  </div>
                </div>
              </div>
            )}
            {!loading && userRepos.length > 0 && (
              <div className="repos">
                <h3>Repositories</h3>
                <ul>
                  {userRepos.map(repo => (
                    <li key={repo.id}>
                      <p>
                        <Link
                          to={{
                            pathname: `${this.props.match.params.id}/${repo.name}`,
                            state: { repo }
                          }}
                        >
                          {repo.name}
                        </Link>{" "}
                        - {repo.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Route>
        <Route path={`${this.props.match.path}/:repoId`} component={RepoPage} />
      </Switch>
    );
  }
}
