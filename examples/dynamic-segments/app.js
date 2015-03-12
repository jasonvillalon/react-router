var React = require('react');
var Router = require('react-router');
var { Route, Redirect, RouteHandler, Link } = Router;

class App extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to="user" params={{userId: "123"}}>Bob</Link></li>
          <li><Link to="user" params={{userId: "abc"}}>Sally</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}

class User extends React.Component {

  render() {
    var { userId } = this.props.params
    return (
      <div className="User">
        <h1>User id: {userId}</h1>
        <ul>
          <li><Link to="task" params={{userId: userId, taskId: "foo"}}>foo task</Link></li>
          <li><Link to="task" params={{userId: userId, taskId: "bar"}}>bar task</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}

class Task extends React.Component {
  render () {
    var { userId, taskId } = this.props.params
    return (
      <div className="Task">
        <h2>User id: {userId}</h2>
        <h3>Task id: {taskId}</h3>
      </div>
    );
  }
}

var routes = (
  <Route path="/" handler={App}>
    <Route name="user" path="/user/:userId" handler={User}>
      <Route name="task" path="tasks/:taskId" handler={Task}/>
      <Redirect from="todos/:taskId" to="task"/>
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
