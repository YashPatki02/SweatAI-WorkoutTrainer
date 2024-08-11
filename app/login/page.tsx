import { createClient } from "@/utils/supabase/server";
import Register from "@/components/Register";
import Login from "@/components/Login";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard"); // Server-side redirect if user is authenticated
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-4 mt-4">
            <div className="flex items-center justify-center min-h-auto mt-6 space-x-2">
                <Tabs defaultValue="register" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="register">Register</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="register">
                        <Card>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                    Register a new account here.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Register />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Login to your account here.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Login />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}