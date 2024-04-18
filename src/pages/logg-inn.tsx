import { signIn, signOut, useSession } from "next-auth/react";

const Logginn = () => {


  const { data: session, status } = useSession()
  if (status === "loading") return <div>Loading...</div>
  if (status === "authenticated") return (

    <>
      <div>{`You are alredy logged in ${session.user?.email}`}</div>
      <button onClick={() => signOut()}>Logg ut</button>
    </>
  )
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn<"credentials">("credentials", {
      username: "test",
      password: "test"
    })
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text"></input>
        <input type="password"></input>
        <button type="submit">Logg inn</button>
      </form>
    </div>

  );
}

export default Logginn
