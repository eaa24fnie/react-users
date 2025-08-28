import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error(`Fejl ${response.status}: Kunne ikke hente data`);
      }

      const data = await response.json();
      setPosts(data.slice(0, 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="posts-section">
      <h2>Latest Posts</h2>

      {/* Refresh knap der altid er synlig */}
      <button
        onClick={fetchPosts}
        disabled={loading}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "⏳ Henter..." : "🔄 Refresh Posts"}
      </button>

      {loading && <p>⏳ Henter posts...</p>}

      {error && <p style={{ color: "red" }}>❌ Fejl: {error}</p>}

      {!loading && !error && posts.length > 0 && (
        <>
          <p className="api-info">✅ {posts.length} posts hentet!</p>
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <h3>
                  Post #{post.id}: {post.title}
                </h3>
                <p>
                  <strong>User ID:</strong> {post.userId}
                </p>
                <p>{post.body.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PostList;
