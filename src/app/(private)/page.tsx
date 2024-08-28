import { getMe } from "@/server-actions/get-me.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileIcon, BookOpenIcon, PencilIcon, CalendarIcon, HardDriveIcon, PackageIcon, MailIcon, HashIcon, CreditCardIcon, ClockIcon } from "lucide-react";

export default async function DashboardPage() {
  const user = await getMe();

  return (
    <div className="container mx-auto p-6 max-w-7xl b min-h-screen">
      <header className="mb-8 bg-indigo-100 p-6 rounded-lg shadow-sm border-b border-indigo-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Welcome, {user.name}</h1>
        <p className="text-indigo-600">Here&rsquo;s an overview of your account</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-blue-50 border-blue-200 overflow-hidden">
          <CardHeader className="border-b border-blue-200">
            <CardTitle className="text-blue-700 flex items-center">
              <BookOpenIcon className="h-5 w-5 mr-2 text-blue-500" />
              Remaining Reads
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {user.subscription.today_remaining_reads}/{user.subscription.subscription_plan.max_daily_reads}
            </div>
            <p className="text-sm text-blue-600">You&rsquo;ve used {user.subscription.subscription_plan.max_daily_reads - user.subscription.today_remaining_reads} reads today</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200 overflow-hidden">
          <CardHeader className="border-b border-green-200">
            <CardTitle className="text-green-700 flex items-center">
              <PencilIcon className="h-5 w-5 mr-2 text-green-500" />
              Remaining Writes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-700 mb-2">
              {user.subscription.today_remaining_writes}/{user.subscription.subscription_plan.max_daily_writes}
            </div>
            <p className="text-sm text-green-600">You&rsquo;ve used {user.subscription.subscription_plan.max_daily_writes - user.subscription.today_remaining_writes} writes today</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200 overflow-hidden">
          <CardHeader className="border-b border-purple-200">
            <CardTitle className="text-purple-700 flex items-center">
              <FileIcon className="h-5 w-5 mr-2 text-purple-500" />
              Files
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-purple-700 mb-2">
              {user.file_count}
            </div>
            <p className="text-sm text-purple-600">Total files in your account</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 overflow-hidden">
          <CardHeader className="border-b border-yellow-200">
            <CardTitle className="text-yellow-700 flex items-center">
              <PackageIcon className="h-5 w-5 mr-2 text-yellow-500" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="default" className="bg-teal-500 hover:bg-teal-600">
                {user.subscription.status}
              </Badge>
              <span className="text-lg font-semibold text-yellow-700">
                {user.subscription.subscription_plan.name}
              </span>
            </div>
            <div className="flex items-center text-yellow-600">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              <span className="text-sm">Plan details</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-pink-50 border-pink-200 overflow-hidden">
          <CardHeader className="border-b border-pink-200">
            <CardTitle className="text-pink-700 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-pink-500" />
              Subscription Period
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-xl font-semibold text-pink-700 mb-2">
              {new Date(user.subscription.start_date).toLocaleDateString()} - {new Date(user.subscription.end_date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-pink-600">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span className="text-sm">3 months duration</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyan-50 border-cyan-200 overflow-hidden">
          <CardHeader className="border-b border-cyan-200">
            <CardTitle className="text-cyan-700 flex items-center">
              <HardDriveIcon className="h-5 w-5 mr-2 text-cyan-500" />
              Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-cyan-700">Storage Remaining</span>
                  <span className="text-sm font-medium text-cyan-700">
                    {user.subscription.storage_remaining_bytes / 1000000} MB
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-cyan-600">
                <span>Max File Size:</span>
                <span className="font-semibold">
                  {user.subscription.subscription_plan.max_file_size_bytes / 1000000} MB
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200 md:col-span-2 lg:col-span-3 overflow-hidden">
          <CardHeader className="border-b border-orange-200">
            <CardTitle className="text-orange-700 flex items-center">
              <HashIcon className="h-5 w-5 mr-2 text-orange-500" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-orange-200">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm">
                    <MailIcon className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-orange-700">Email</p>
                      <p className="text-sm text-orange-800">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm">
                    <BookOpenIcon className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-orange-700">Max Daily Reads</p>
                      <p className="text-sm text-orange-800">{user.subscription.subscription_plan.max_daily_reads}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm">
                  <BookOpenIcon className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-orange-700">Max Daily Writes</p>
                    <p className="text-sm text-orange-800">{user.subscription.subscription_plan.max_daily_writes}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
