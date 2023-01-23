const { useMutation, useQuery } = require("@apollo/client")
const { useState } = require("react")
const { LOGIN, ME } = require("../queries")

const Login = ({show, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const me = useQuery(ME);

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("library-user-token", data.login.value);
      setPage("authors");
      // if ME query is refetched with refetchQueries, the token will not be yet set 
      // on the local storage, so the user will still be logged out.
      me.refetch();
    },
    onError: (error) => {
      console.log(error);
    },

  });
  
  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login;