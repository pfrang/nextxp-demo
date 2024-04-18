import { signIn, useSession } from "next-auth/react"

const Something = () => {
  const session = useSession()
  return (
    <div>
    hei
    <button onClick={() => signIn()}>Logg session</button>
    </div>
  )
}

export default Something
