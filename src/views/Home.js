import { useAuth } from "../context/authContext";

export const Home = () => {
  const { user, logOut, loading } = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="w-full max-w-sm m-auto text-black">
      <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl mb-4">Bienvenido {user.email}</h1>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="picture"
              className="rounded-full w-14"
            />
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
