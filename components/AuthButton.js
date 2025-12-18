"use client";

import { useState } from "react";
import { signOut } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { User } from "@supabase/supabase-js";

export default function AuthButton({ user }) {

 
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={signOut}>
        <Button variant="ghost" size="sm" type="submit" className="gap-2 p-6">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        variant="default"
        size="sm"
        className="bg-blue-500 hover:bg-blue-600 gap-2 p-6"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}