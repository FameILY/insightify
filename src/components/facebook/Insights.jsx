// src/components/facebook/insights.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const Insights = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInsights = async () => {
      try {
        const res = await fetch("/api/instagram/getInsights", {
          method: "GET",
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_KEY,
            email: session.user.email,
            Accept: "application/json",
          },
        });

        if (res.status === 401) {        
          throw new Error("Token expired or unauthorized. Please sign in again.");
          
        }

        const data = await res.json()
        setInsights(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
   
      getInsights();
    
  }, [session]);

  if (loading) return <div>Loading insights...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Insights</h2>

      {insights ? <pre>{JSON.stringify(insights, null, 2)}</pre> : <>WHAT</>}
    </div>
  );
};

export default Insights;
