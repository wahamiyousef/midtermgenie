import { FormEvent, useState } from "react";

import { supabase } from "../../../supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Auth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">

      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] text-center">
          <h1 className="text-3xl">MidtermGenie</h1>
          <p>
            Sign in via magic link with your email below
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <Input 
                type="email" 
                placeholder="Email" 
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/*
              <input
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              */}
            </div>
            <div>
              <Button disabled={!email}>
                {loading ? <span>Loading..</span> : <span>Send magic link</span>}
              </Button>
            </div>
          </form>
        </div>
        
        {/*
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <p className="bg-background px-2 text-muted-foreground">or continue with</p>
          </div>
        </div>
        */}

      </div>
    </div>
  );
};