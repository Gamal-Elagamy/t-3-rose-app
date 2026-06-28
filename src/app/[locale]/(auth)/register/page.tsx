import React from 'react';
// just for testing purpose, will be removed later
export default function Register() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">Fill in the details to create your account.</p>
      </div>

      <form className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>

            <button type="button" className="text-sm text-primary hover:underline">
              Forgot Password?
            </button>
          </div>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input id="remember" type="checkbox" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button type="submit" className="w-full rounded-md border py-2 font-medium">
          Create Account
        </button>
      </form>

      <p className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <button type="button" className="font-medium hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}
