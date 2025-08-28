function UserCard({ user }) {
  // Vis brugerens data her
  return (
    <div>
      <img src={user.image} alt={user.name} />
      <p>{user.name}</p>
      <p>{user.mail}</p>
      <p>{user.title}</p>
    </div>
  );
}
export default UserCard;
