import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="admin-loading">
        Checking access...
      </div>
    );
  }

  if (!authorized) {
    return (
      <Navigate
        to="/getajob-admin"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;