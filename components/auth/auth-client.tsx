"use client";

import { useCallback, useState } from "react";

import { Logo } from "~/components/logo";
import { SocialLoginOptions } from "./social-login-options";
import { RegisterForm } from "./register-form";
import { LoginForm } from "./login-form";

export function AuthClient() {
  const [currentModule, setCurrentModule] = useState<"LOGIN" | "REGISTER">(
    "LOGIN",
  );

  const toggleModule = useCallback(() => {
    if (currentModule === "LOGIN") {
      setCurrentModule("REGISTER");
    } else {
      setCurrentModule("LOGIN");
    }
  }, [currentModule]);

  return (
    <div className="flex w-full flex-col items-center gap-y-4 px-10">
      <Logo size={100} />
      <h1 className="text-2xl font-bold">{currentModule}</h1>
      {currentModule === "LOGIN" ? (
        <LoginForm />
      ) : (
        <RegisterForm setCurrentModule={setCurrentModule} />
      )}
      {currentModule === "LOGIN" && (
        <>
          <p className="text-sm text-muted-foreground">or login using</p>
          <SocialLoginOptions />
        </>
      )}
      <div className="text-sm">
        {currentModule === "LOGIN" ? "Don't" : "Already"} have an account?{" "}
        <span
          onClick={toggleModule}
          className="cursor-pointer text-indigo-500 underline"
        >
          {currentModule === "LOGIN" ? "Register" : "Login"}
        </span>
      </div>
    </div>
  );
}
