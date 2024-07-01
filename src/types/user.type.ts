type SubscriptionStatus = "active" | "canceled" | "inactive";

type SubscriptionPlan = {
  id: string;
  name: string;
  max_daily_reads: number;
  max_daily_writes: number;
  max_storage_bytes: number;
  max_file_size_bytes: number;
};

type Subscription = {
  id: string;
  start_date: Date;
  end_date: Date;
  status: SubscriptionStatus;
  today_remaining_reads: number;
  today_remaining_writes: number;
  storage_remaining_bytes: number;
  max_file_size_bytes: number;
  subscription_plan: SubscriptionPlan;
};

export type User = {
  id: string;
  name: string;
  email: string;
  file_count: number;
  subscription: Subscription;
};
