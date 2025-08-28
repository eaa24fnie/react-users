import { useEffect, useState } from "react";
import User from "./components/User";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
import UserCard from "./components/UserCard";
import PostList from "./components/PostList";
import SimpleUserPosts from "./components/SimpleUserPosts";

// Destructurering før at man tager værdien fra en variable, og gør den mere simpel.
// så istedet const user = { name: "Mia", age: 25, city: "Aarhus" };
// kan man skrive const { name, age, city } = user;

function App() {
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
      );
      const data = await response.json();

      setUsers(data);
      // setLoading(false);
    }
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   if (users.length === 0) alert("Ingen brugere!");
  // }, [users, loading]);

  // if (loading) {
  //   return (
  //     <div className="page">
  //       <h1>Users</h1>
  //       <p>Loading...</p> {/* <-- vis loader */}
  //     </div>
  //   );
  // }

  {
    users.map((user) => <UserCard user={user} key={user.id} />);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newUser = {
      name: form.name.value,
      mail: form.mail.value,
      title: form.title.value,
      image: form.image.value,
    };

    console.log("Sender til server:", newUser);

    try {
      // Simuler POST til server
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      console.log("Response status:", response.status);

      const serverResponse = await response.json();
      console.log("Server svarede:", serverResponse);

      // Tilføj til lokal liste (med vores eget ID)
      const userWithId = {
        ...newUser,
        id: crypto.randomUUID(),
      };

      setUsers([...users, userWithId]);
      form.reset();

      alert("✅ Bruger tilføjet!");
    } catch (error) {
      console.error("❌ Fejl:", error);
      alert("Kunne ikke tilføje bruger: " + error.message);
    }
  }

  return (
    <div className="page">
      <h1>Users</h1>
      <section>
        <PostList />
        <SimpleUserPosts />;
      </section>
      <section className="grid">
        {users.map((user) => (
          <User user={user} />
        ))}
      </section>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Navn" required />
        <input name="mail" placeholder="Mail" required />
        <input name="title" placeholder="Titel" required />
        <input name="image" placeholder="Billede-URL" required />
        <button type="submit">Tilføj bruger</button>
      </form>
    </div>
  );
}

export default App;
