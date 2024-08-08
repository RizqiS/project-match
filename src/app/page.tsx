import { auth } from "@/auth";
import ButtonSignOut from "@/components/shared/ButtonSignOut";


export default async function Home() {
   const session = await auth();

   return (
      <main className="p-24">
         {session ? (
            <div>
               <pre>{JSON.stringify(session, null, 2)}</pre>
               <ButtonSignOut />
            </div>
         ) : (
            <div>not found session</div>
         )}
      </main>
   );
}
