import { getMe } from "@/server-actions/get-me.action";

export default async function DashboardPage() {
  const user = await getMe();
  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            flex: 1,
          }}
        >
          <p style={{ fontSize: "24px", margin: "0" }}>
            {user.subscription.today_remaining_reads}/
            {user.subscription.subscription_plan.max_daily_reads}
          </p>
          <p>Remaining Reads</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            flex: 1,
          }}
        >
          <p style={{ fontSize: "24px", margin: "0" }}>
            {user.subscription.today_remaining_writes}/
            {user.subscription.subscription_plan.max_daily_writes}
          </p>
          <p>Remaining Writes</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            flex: 1,
          }}
        >
          <p style={{ fontSize: "24px", margin: "0" }}>{user.file_count}</p>
          <p>Files</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>User Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Subscription Status:</strong> {user.subscription.status}
        </p>
        <p>
          <strong>Subscription Plan:</strong>{" "}
          {user.subscription.subscription_plan.name}
        </p>
        <p>
          <strong>Subscription Period:</strong>{" "}
          {new Date(user.subscription.start_date).toLocaleDateString()} -{" "}
          {new Date(user.subscription.end_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Max Daily Reads:</strong>{" "}
          {user.subscription.subscription_plan.max_daily_reads}
        </p>
        <p>
          <strong>Max Daily Writes:</strong>{" "}
          {user.subscription.subscription_plan.max_daily_writes}
        </p>
        <p>
          <strong>Max File Size:</strong>{" "}
          {user.subscription.subscription_plan.max_file_size_bytes / 1000000} MB
        </p>
        <p>
          <strong>Storage Remaining:</strong>{" "}
          {user.subscription.storage_remaining_bytes / 1000000} MB
        </p>
      </div>
    </main>
  );
}
