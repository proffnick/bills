import Admin from "@/pages/components/Admin";
import { useRouter } from "next/router";

const AdminPage = () => {
  const router = useRouter();
  const win = (typeof document !== 'undefined') ? window.location.href.split('/'): null;
  const { active } = router.query || {active: win[win.length -1]}; 

  return (
    <Admin active={active} />
  )
}

export default AdminPage;