import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          background: "#050505",
          color: "#f4f4f2",
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "4rem", fontWeight: 700 }}>404</p>
            <Link
              href="/es"
              style={{
                marginTop: "1rem",
                display: "inline-block",
                textDecoration: "underline",
              }}
            >
              ← Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
