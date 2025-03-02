import { FormEvent, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Brain, CircleAlert, MailCheck } from "lucide-react";

export const Auth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Check your email to confirm your account." });
    }
    setLoading(false);
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button variant={"ghost"} className="absolute right-4 top-4 md:right-8 md:top-8">Go to home</Button>

      {/*</div><div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">*/}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="relative z-20 flex items-center text-lg font-medium gap-2">
          <Brain /> MidtermGenie
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "It is true you can be successful without [college], but this is a hard world, a real world, and you want every advantage you can have."
            </p>
            <footer className="text-sm">- Ye</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col lg:p-8 gap-4 items-center p-10 h-screen justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] text-center">
          <h1 className="text-3xl">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your email and password to create your account</p>
          {message && (
            <Alert className={message.type === "error" ? "bg-red-500" : "bg-green-500"}>
              {message.type === "error" ? <CircleAlert className="h-4 w-4" /> : <MailCheck className="h-4 w-4" />}
              <AlertTitle>{message.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <Input 
              type="email" 
              placeholder="Email *" 
              value={email} 
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder="Password *" 
              value={password} 
              required 
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={!email || !password}>
              {loading ? <span>Loading...</span> : <span>Sign Up</span>}
            </Button>
          </form>
        </div>
        
        <div className="relative sm:w-[350px]">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <p className="bg-background px-2 text-muted-foreground">or continue with</p>
          </div>
        </div>
        <div>
          <Button>Log in</Button>
        </div>
      </div>
    </div>
  );
};
