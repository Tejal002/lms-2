import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap:"5px"
      }}
    >
      <h1 className="font-semibold">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>

      <Link to="/">
        <button className="bg-black text-amber-50 px-4 rounded">Go Home</button>
      </Link>
    </div>
  );
};

export default NotFound;