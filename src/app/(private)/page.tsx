import { getMe } from "@/server-actions/get-me.action";

export default async function DashboardPage() {
  const user = await getMe();
  return (
    <main>
      <div>
        <div>
          <p>
            {user.subscription.today_remaining_reads}/
            {user.subscription.subscription_plan.max_daily_reads}
          </p>
          <p>Remaining Reads</p>
        </div>
        <div>
          <p>
            {user.subscription.today_remaining_writes}/
            {user.subscription.subscription_plan.max_daily_writes}
          </p>
          <p>Remaining Writes</p>
        </div>
        <div>
          <p>{user.file_count}</p>
          <p>Files</p>
        </div>
      </div>
      {/* what does below stringified user object look like? */}
      {/*why we used pre tag?*/}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h1>dashboard page</h1>
    </main>
  );
}