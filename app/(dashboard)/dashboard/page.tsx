"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Sidebar } from "lucide-react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import Chat from "@/components/Chat";

function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Set back to true later
  const router = useRouter();
  const supabase = createClient();

  const [botType, setBotType] = useState("fitness");
  useEffect(() => {
    console.log("bot changed to", botType);
    // if bot changes the message changes get from backend
  }, [botType]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        return router.push("/"); // Redirect to login if no user
      }
      //   console.log('user id is ')
      console.log("User ID is:", user.id);
      setLoading(false);
    };
    // setLoading(true);
    fetchUser();
    //   }, [router, supabase]);
  }, [router, supabase]);

  if (loading) {
    return <p>Loading...</p>; // Show loading page
  } else {
    return (
      <div className="flex flex-row justify-start items-start overflow-hidden">
        <ChatSidebar setBotType={setBotType} />
        <div className="flex flex-col flex-1">
          <ChatHeader />
          <Chat botType={botType} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
