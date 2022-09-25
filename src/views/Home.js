import { useAuth } from "../context/authContext";

export const Home = () => {
  const { user, logOut, loading } = useAuth();
  const handleLogout = async () => {
    await logOut();
  };
  console.log(user);

  if (loading) return <h1>Loading</h1>;

  return (
    <div>
      <h1>Bienvenido {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
